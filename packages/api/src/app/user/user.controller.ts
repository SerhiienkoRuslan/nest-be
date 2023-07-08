import { Get, Body, Put, Delete, Param, Controller } from '@nestjs/common';

import { UpdateUserDto } from './dto';

import { UserService } from './user.service';
import { UserData, UserRO } from '../common/interfaces/user.interface';
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
    @Param() params,
  ) {
    return await this.userService.update(user, { ...userData, id: +params.id });
  }

  @Delete('user/:id')
  async delete(@User() user: UserData, @Param() params) {
    return await this.userService.delete(+params.id, user);
  }
}
