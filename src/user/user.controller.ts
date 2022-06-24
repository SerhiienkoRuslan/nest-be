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

import { ValidationPipe } from '../shared/pipes/validation.pipe';

import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';

import { UserService } from './user.service';
import { UserRO } from './user.interface';
import { User } from './user.decorator';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async findAll(): Promise<UserRO[]> {
    return await this.userService.findAll();
  }

  @Get('me')
  async findMe(@User('id') id: number): Promise<UserRO> {
    return await this.userService.findById(id);
  }

  @Get('user')
  async findUser(@User('id') id: number): Promise<UserRO> {
    return await this.userService.findById(id);
  }

  @Put('user')
  async update(
    @User('user') userId: number,
    @Body('user') userData: UpdateUserDto,
  ) {
    return await this.userService.update(userId, userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('user')
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete('user/:id')
  async delete(@Param() params) {
    return await this.userService.delete(params.id);
  }

  @UsePipes(new ValidationPipe())
  @Post('user/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    return await this.userService.login(loginUserDto);
  }
}
