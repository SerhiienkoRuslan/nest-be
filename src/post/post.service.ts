import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostRO } from './post.interface';

const select = {
  id: true,
  title: true,
  content: true,
  published: true,
  authorId: true,
  author: true
};

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<any[]> {
    return await this.prisma.post.findMany({ select });
  }

  async create(dto: CreatePostDto): Promise<PostRO> {
    // TODO: Check if creator is valid
    // const { title, content, published, authorId } = dto;

    const data = { ...dto };
    const post = await this.prisma.post.create({ data, select });

    return { post };
  }

  async update(id: string, data: UpdatePostDto): Promise<any> {
    const where = { id: +id };
    const post = await this.prisma.post.update({ where, data, select });

    return { post };
  }

  async delete(id: string): Promise<any> {
    return await this.prisma.post.delete({ where: { id: +id }, select });
  }

  async findById(id: string): Promise<any>{
    const post = await this.prisma.post.findUnique({ where: { id: +id }, select: { id: true, ...select } });
    return { post };
  }
}
