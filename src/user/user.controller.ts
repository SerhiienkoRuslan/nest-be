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
import { UserData, UserRO } from "./user.interface";
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

  @Get('user/:id')
  async findUser(@Param() params): Promise<UserRO> {
    return await this.userService.findById(+params.id);
  }

  @Put('user/:id')
  async update(
    @User() user: UserData,
    @Body() userData: UpdateUserDto,
    @Param() params
  ) {
    return await this.userService.update(user, { ...userData, id: +params.id });
  }

  @UsePipes(new ValidationPipe())
  @Post('user')
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete('user/:id')
  async delete(
    @User() user: UserData,
    @Param() params
  ) {
    return await this.userService.delete(+params.id, user);
  }

  @UsePipes(new ValidationPipe())
  @Post('user/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    return await this.userService.login(loginUserDto);
  }
}
