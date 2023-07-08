import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

import { hasPermission } from 'src/shared/pipes/userUtils';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto';
import { UserData } from '../common/interfaces/user.interface';

const select = {
  email: true,
  username: true,
  bio: true,
  avatar: true,
  id: true,
  role: true,
  posts: {
    select: {
      id: true,
      title: true,
    },
  },
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<any[]> {
    return await this.prisma.user.findMany({ select });
  }

  async update(userData: UserData, data: UpdateUserDto): Promise<any> {
    if (hasPermission(userData?.id, data)) {
      const where = { id: userData?.id };
      const user = await this.prisma.user.update({ where, data, select });

      return { user };
    } else {
      throw new HttpException({ error: 'No Permission' }, 403);
    }
  }

  async delete(id: number, user: any): Promise<any> {
    if (hasPermission(id, user)) {
      return await this.prisma.user.delete({ where: { id }, select });
    } else {
      throw new HttpException({ error: 'No Permission' }, 403);
    }
  }

  async findById(id: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, ...select },
    });
    return { user };
  }

  async findByEmail(email: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select,
    });
    return { user };
  }
}
