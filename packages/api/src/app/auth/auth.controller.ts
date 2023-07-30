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
    const sent = await this.authService.registration(userData);

    if (sent) {
      return new ResponseSuccess('REGISTRATION.USER_REGISTERED_SUCCESSFULLY');
    } else {
      throw new HttpException('REGISTRATION.ERROR.MAIL_NOT_SENT', HttpStatus.FORBIDDEN);
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    return await this.authService.login(loginUserDto);
  }

  @Get('verify/:token')
  async verifyEmail(@Param() params: VerifyEmailDto): Promise<IResponse> {
    const isEmailVerified = await this.authService.verifyEmail(params.token);
    return new ResponseSuccess('LOGIN.EMAIL_VERIFIED', isEmailVerified);
  }

  @Get('resend-verification/:email')
  async sendEmailVerification(@Param() params: ResendEmailDto): Promise<IResponse> {
    await this.authService.createEmailToken(params.email);
    const isEmailSent = await this.authService.sendEmailVerification(params.email);

    if (isEmailSent) {
      return new ResponseSuccess('LOGIN.EMAIL_RESENT', null);
    } else {
      throw new HttpException('REGISTRATION.ERROR.MAIL_NOT_SENT', HttpStatus.FORBIDDEN);
    }
  }

  @Get('forgot-password/:email')
  async sendEmailForgotPassword(@Param() params): Promise<IResponse> {
    const isEmailSent = await this.authService.sendEmailForgotPassword(params.email);

    if (isEmailSent) {
      return new ResponseSuccess('LOGIN.EMAIL_RESENT', null);
    } else {
      throw new HttpException('REGISTRATION.ERROR.MAIL_NOT_SENT', HttpStatus.FORBIDDEN);
    }
  }

  @Post('reset-password')
  async setNewPassword(@Body() resetPassword: ResetPasswordDto): Promise<IResponse> {
    await this.authService.setNewPassword(resetPassword);
    return new ResponseSuccess('RESET_PASSWORD.PASSWORD_CHANGED');
  }
}
