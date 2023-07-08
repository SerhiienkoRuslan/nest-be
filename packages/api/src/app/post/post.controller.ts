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

import { CreatePostBodyDto, UpdatePostDto } from './dto';
import { PostRO } from './post.interface';
import { PostService } from './post.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.decorator';
import { UserData } from '../common/interfaces/user.interface';

@ApiBearerAuth()
@ApiTags('post')
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('posts')
  async findAll(): Promise<PostRO[]> {
    return await this.postService.findAll();
  }

  @Get('my-posts')
  async findAllCurrent(@User() user: UserData): Promise<PostRO[]> {
    return await this.postService.findAllCurrent(user);
  }

  @Get('post/:id')
  async findPost(@Param() params): Promise<PostRO> {
    return await this.postService.findById(+params.id);
  }

  @Put('post/:id')
  async update(
    @Param() params,
    @Body() postData: UpdatePostDto,
    @User() user: UserData,
  ) {
    return await this.postService.update(params.id, postData, user);
  }

  @UsePipes(new ValidationPipe())
  @Post('post')
  async create(@Body() postData: CreatePostBodyDto, @User() user: UserData) {
    return this.postService.create({ ...postData, authorId: +user?.id });
  }

  @Delete('post/:id')
  async delete(@Param() params, @User() user: UserData) {
    return await this.postService.delete(+params.id, user);
  }
}
