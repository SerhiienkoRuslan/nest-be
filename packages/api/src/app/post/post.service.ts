import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostRO } from './post.interface';
import { UserData } from '../common/interfaces/user.interface';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

const select = {
  id: true,
  title: true,
  content: true,
  published: true,
  authorId: true,
  author: {
    select: {
      id: true,
      email: true,
      username: true,
      avatar: true,
      bio: true,
    },
  },
};

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<any[]> {
    return await this.prisma.post.findMany({
      where: { published: true },
      select,
    });
  }

  async findAllCurrent(user: UserData): Promise<any[]> {
    return await this.prisma.post.findMany({
      where: { authorId: +user?.id },
      select,
    });
  }

  async create(dto: CreatePostDto): Promise<PostRO> {
    const data = { ...dto };
    const post = await this.prisma.post.create({ data, select });

    return { post };
  }

  async update(id: string, data: UpdatePostDto, user: UserData): Promise<any> {
    const where = { id: +id };

    const post = await this.prisma.post.findUnique({
      where: { id: +id },
      select: { id: true, ...select },
    });

    if (+post?.author?.id !== +user?.id) {
      throw new HttpException({ error: 'No Permission' }, 403);
    }

    const updatedPost = await this.prisma.post.update({ where, data, select });

    return { post: updatedPost };
  }

  async delete(id: number, user: UserData): Promise<any> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      select: { id: true, ...select },
    });

    if (+post?.author?.id !== +user?.id) {
      throw new HttpException({ error: 'No Permission' }, 403);
    }

    return await this.prisma.post.delete({ where: { id }, select });
  }

  async findById(id: number): Promise<any> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      select: { id: true, ...select },
    });
    return { post };
  }
}
