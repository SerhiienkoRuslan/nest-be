import { HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import * as argon2 from 'argon2';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { CLIENT_HOST, CLIENT_PORT, MAIL_CONFIG, SECRET } from '../../config';
import { UserService } from '../user/user.service';
import { ResponseError, ResponseSuccess } from '../common/dto/response.dto';
import { IResponse } from '../common/interfaces/response.interface';

const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private userService: UserService) {}

  async createEmailToken(email: string): Promise<boolean> {
    try {
      const emailVerification = await this.prisma.emailVerification.findUnique({
        where: { email },
      });
      const isTimeLeft =
        (new Date().getTime() - emailVerification?.timestamp?.getTime()) / 60000 < 1; // 1min left

      if (emailVerification && isTimeLeft) {
        throw new HttpException('LOGIN.EMAIL_SENT_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        const emailData = {
          email,
          emailToken: (Math.floor(Math.random() * 9000000) + 1000000).toString(), //Generate 7 digits number
          timestamp: new Date(),
        };

        await this.prisma.emailVerification.upsert({
          where: {
            email,
          },
          create: emailData,
          update: emailData,
        });
        return true;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async sendEmailVerification(email: string): Promise<boolean> {
    const model = await this.prisma.emailVerification.findUnique({
      where: { email },
    });

    if (model?.emailToken) {
      const transporter = nodemailer.createTransport({
        host: MAIL_CONFIG.host,
        port: MAIL_CONFIG.port,
        secure: MAIL_CONFIG.secure, // true for 465, false for other ports
        auth: {
          user: MAIL_CONFIG.user,
          pass: MAIL_CONFIG.pass,
        },
      });

      const mailOptions = {
        from: '"Company" <' + MAIL_CONFIG.user + '>',
        to: email,
        subject: 'Verify Email',
        text: 'Verify Email',
        html:
          'Hi! <br><br> Thanks for your registration<br><br>' +
          '<a href=' +
          CLIENT_HOST +
          ':' +
          CLIENT_PORT +
          '/auth/email/verify/' +
          model.emailToken +
          '>Click here to activate your account</a>',
      };

      return await new Promise<boolean>(async function (resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log('Message sent: %s', error);
            return reject(false);
          }
          console.log('Message sent: %s', info.messageId);
          resolve(true);
        });
      });
    } else {
      throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
    }
  }

  async login(payload: LoginUserDto): Promise<any> {
    const { user } = await this.userService.findByEmail(payload.email, {
      password: true,
      validEmail: true,
    });

    if (!user) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    if (!user.validEmail) throw new HttpException('LOGIN.EMAIL_NOT_VERIFIED', HttpStatus.FORBIDDEN);

    const authenticated = await argon2.verify(user.password, payload.password);

    if (authenticated) {
      const token = await this.generateJWT(user);
      const { password, ...temp } = user;

      return {
        user: { token, ...temp },
      };
    } else {
      throw new HttpException('LOGIN.ERROR', HttpStatus.UNAUTHORIZED);
    }
  }

  async registration(dto: CreateUserDto): Promise<IResponse> {
    try {
      const { username, email, password } = dto;

      // check uniqueness of username/email
      const userNotUnique = await this.userService.findByEmail(email);

      if (userNotUnique) {
        return new ResponseError(
          'REGISTRATION.ERROR.MUST_BE_UNIQUE',
          'Input data validation failed',
        );
      }

      const hashedPassword = await argon2.hash(password);
      const newUser = await this.userService.create({
        username,
        email,
        password: hashedPassword,
      });

      await this.createEmailToken(newUser.email);
      const sent = await this.sendEmailVerification(newUser.email);

      if (sent) {
        return new ResponseSuccess('REGISTRATION.USER_REGISTERED_SUCCESSFULLY');
      } else {
        return new ResponseError('REGISTRATION.ERROR.MAIL_NOT_SENT');
      }
    } catch (error) {
      return new ResponseError('REGISTRATION.ERROR.GENERIC_ERROR', error);
    }
  }

  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }
}
