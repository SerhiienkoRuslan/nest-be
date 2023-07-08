import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  UsePipes,
} from '@nestjs/common';

import { ValidationPipe } from '../../shared/pipes/validation.pipe';

import { CreateUserDto, LoginUserDto } from './dto';

import { AuthService } from './auth.service';
import { UserRO } from '../common/interfaces/user.interface';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('registration')
  async create(@Body() userData: CreateUserDto) {
    return this.authService.registration(userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    return await this.authService.login(loginUserDto);
  }
}
