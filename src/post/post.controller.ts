import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  UsePipes
} from "@nestjs/common";

import { ValidationPipe } from '../shared/pipes/validation.pipe';

import { CreatePostDto, UpdatePostDto } from './dto';
import { PostRO } from './post.interface';
import { PostService } from './post.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('post')
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('posts')
  async findAll(): Promise<PostRO[]> {
    return await this.postService.findAll();
  }

  @Get('post/:id')
  async findPost(@Param() params): Promise<PostRO> {
    return await this.postService.findById(params.id);
  }

  @Put('post/:id')
  async update(
    @Param() params,
    @Body() postData: UpdatePostDto,
  ) {
    return await this.postService.update(params.id, postData);
  }

  @UsePipes(new ValidationPipe())
  @Post('post')
  async create(@Body() postData: CreatePostDto) {
    return this.postService.create(postData);
  }

  @Delete('post/:id')
  async delete(@Param() params) {
    return await this.postService.delete(params.id);
  }
}
