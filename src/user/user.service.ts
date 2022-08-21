import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
const jwt = require('jsonwebtoken');
import * as argon2 from 'argon2';

import { hasPermission } from 'src/shared/pipes/userUtils'
import { PrismaService } from '../prisma.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { SECRET } from '../config';
import { UserData, UserRO } from "./user.interface";

const select = {
  email: true,
  username: true,
  bio: true,
  avatar: true,
  id: true,
  posts: {
    select: {
      id: true,
      title: true
    }
  }
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<any[]> {
    return await this.prisma.user.findMany({ select });
  }

  async login(payload: LoginUserDto): Promise<any> {
    const _user = await this.prisma.user.findUnique({
      where: { email: payload.email }
    });

    const errors = { User: 'email or password wrong' };

    if (!_user) throw new HttpException({errors}, 401);

    const authenticated = await argon2.verify(_user.password, payload.password);

    if (!authenticated) throw new HttpException({errors}, 401);

    const token = await this.generateJWT(_user);
    const { password, ...user } = _user;

    return {
      user: { token, ...user }
    };
  }

  async create(dto: CreateUserDto): Promise<UserRO> {
    const { username, email, password } = dto;

    // check uniqueness of username/email
    const userNotUnique = await this.prisma.user.findUnique({
      where: { email }
    });

    if (userNotUnique) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await argon2.hash(password);

    const data = {
      username,
      email,
      password: hashedPassword
    };
    const user = await this.prisma.user.create({ data, select });

    return { user };
  }

  async update(userData: UserData, data: UpdateUserDto): Promise<any> {
    if (hasPermission(userData?.id, data)) {
      const where = { id: userData?.id };
      const user = await this.prisma.user.update({ where, data, select });

      return { user };
    } else {
      throw new HttpException({ error: 'No Permission' }, 403);
    }
  }

  async delete(id: number, user: any): Promise<any> {
    if (hasPermission(id, user)) {
      return await this.prisma.user.delete({ where: { id }, select });
    } else {
      throw new HttpException({ error: 'No Permission' }, 403);
    }
  }

  async findById(id: number): Promise<any>{
    const user = await this.prisma.user.findUnique({ where: { id }, select: {id: true, ...select} });
    return { user };
  }

  async findByEmail(email: string): Promise<any>{
    const user = await this.prisma.user.findUnique({ where: { email }, select });
    return { user };
  }

  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      exp: exp.getTime() / 1000,
    }, SECRET);
  };
}
