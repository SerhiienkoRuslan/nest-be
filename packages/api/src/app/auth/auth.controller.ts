import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { UserRO } from '../common/interfaces/user.interface';
import { ResponseError, ResponseSuccess } from '../common/dto/response.dto';
import { IResponse } from '../common/interfaces/response.interface';

import { CreateUserDto, LoginUserDto } from './dto';
import { AuthService } from './auth.service';
import { VerifyEmailDto } from './dto/verify-email.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('registration')
  async create(@Body() userData: CreateUserDto): Promise<IResponse> {
    return this.authService.registration(userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    return await this.authService.login(loginUserDto);
  }

  @UsePipes(new ValidationPipe())
  @Post('verify/:token')
  async verifyEmail(@Param() params: VerifyEmailDto): Promise<IResponse> {
    try {
      const isEmailVerified = await this.authService.verifyEmail(params.token);
      return new ResponseSuccess('LOGIN.EMAIL_VERIFIED', isEmailVerified);
    } catch (error) {
      console.log(error);
      return new ResponseError('LOGIN.ERROR', error);
    }
  }
}
