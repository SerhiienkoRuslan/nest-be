import { Get, Post, Body, Param, Controller, UsePipes, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ValidationPipe } from '../../shared/pipes/validation.pipe';

// Interface
import { UserRO } from '../common/interfaces/user.interface';
import { ResponseSuccess } from '../common/dto/response.dto';
import { IResponse } from '../common/interfaces/response.interface';

// DTO
import {
  CreateUserDto,
  LoginUserDto,
  VerifyEmailDto,
  ResendEmailDto,
  ResetPasswordDto,
} from './dto';

// Service
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('registration')
  async create(@Body() userData: CreateUserDto): Promise<IResponse> {
    try {
      const sent = this.authService.registration(userData);

      if (sent) {
        return new ResponseSuccess('REGISTRATION.USER_REGISTERED_SUCCESSFULLY');
      } else {
        throw new HttpException('REGISTRATION.ERROR.MAIL_NOT_SENT', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw new HttpException(
        error.response || 'REGISTRATION.ERROR.GENERIC_ERROR',
        error.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    return await this.authService.login(loginUserDto);
  }

  @Get('verify/:token')
  async verifyEmail(@Param() params: VerifyEmailDto): Promise<IResponse> {
    try {
      const isEmailVerified = await this.authService.verifyEmail(params.token);
      return new ResponseSuccess('LOGIN.EMAIL_VERIFIED', isEmailVerified);
    } catch (error) {
      throw new HttpException(
        error.response || 'LOGIN.ERROR',
        error.status || HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get('resend-verification/:email')
  async sendEmailVerification(@Param() params: ResendEmailDto): Promise<IResponse> {
    try {
      await this.authService.createEmailToken(params.email);
      const isEmailSent = await this.authService.sendEmailVerification(params.email);

      if (isEmailSent) {
        return new ResponseSuccess('LOGIN.EMAIL_RESENT', null);
      } else {
        throw new HttpException('REGISTRATION.ERROR.MAIL_NOT_SENT', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw new HttpException(
        error.response || 'LOGIN.ERROR.SEND_EMAIL',
        error.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Get('forgot-password/:email')
  async sendEmailForgotPassword(@Param() params): Promise<IResponse> {
    try {
      const isEmailSent = await this.authService.sendEmailForgotPassword(params.email);

      if (isEmailSent) {
        return new ResponseSuccess('LOGIN.EMAIL_RESENT', null);
      } else {
        throw new HttpException('REGISTRATION.ERROR.MAIL_NOT_SENT', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      throw new HttpException(
        error.response || 'LOGIN.ERROR.SEND_EMAIL',
        error.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Post('reset-password')
  async setNewPassword(@Body() resetPassword: ResetPasswordDto): Promise<IResponse> {
    try {
      await this.authService.setNewPassword(resetPassword);
      return new ResponseSuccess('RESET_PASSWORD.PASSWORD_CHANGED');
    } catch (error) {
      throw new HttpException(
        error.response || 'RESET_PASSWORD.CHANGE_PASSWORD_ERROR',
        error.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
