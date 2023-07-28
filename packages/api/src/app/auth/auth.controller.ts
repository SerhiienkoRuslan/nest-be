import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ValidationPipe } from '../../shared/pipes/validation.pipe';

// Interface
import { UserRO } from '../common/interfaces/user.interface';
import { IResponse } from '../common/interfaces/response.interface';

// DTO
import {
  CreateUserDto,
  LoginUserDto,
  VerifyEmailDto,
  ResendEmailDto,
  ResetPasswordDto,
} from './dto';
import { ResponseError, ResponseSuccess } from '../common/dto/response.dto';

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
    const sent = await this.authService.registration(userData);

    if (sent) {
      return new ResponseSuccess('REGISTRATION.USER_REGISTERED_SUCCESSFULLY');
    } else {
      return new ResponseError('REGISTRATION.ERROR.MAIL_NOT_SENT');
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
      return new ResponseError('LOGIN.ERROR', error);
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
        return new ResponseError('REGISTRATION.ERROR.MAIL_NOT_SENT');
      }
    } catch (error) {
      return new ResponseError('LOGIN.ERROR.SEND_EMAIL', error);
    }
  }

  @Get('forgot-password/:email')
  async sendEmailForgotPassword(@Param() params): Promise<IResponse> {
    try {
      const isEmailSent = await this.authService.sendEmailForgotPassword(params.email);

      if (isEmailSent) {
        return new ResponseSuccess('LOGIN.EMAIL_RESENT', null);
      } else {
        return new ResponseError('REGISTRATION.ERROR.MAIL_NOT_SENT');
      }
    } catch (error) {
      return new ResponseError('LOGIN.ERROR.SEND_EMAIL', error);
    }
  }

  @Post('reset-password')
  async setNewPassword(@Body() resetPassword: ResetPasswordDto): Promise<IResponse> {
    try {
      await this.authService.setNewPassword(resetPassword);
      return new ResponseSuccess('RESET_PASSWORD.PASSWORD_CHANGED');
    } catch (error) {
      return new ResponseError('RESET_PASSWORD.CHANGE_PASSWORD_ERROR', error);
    }
  }
}
