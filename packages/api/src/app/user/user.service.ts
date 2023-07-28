import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

import { hasPermission } from 'src/shared/pipes/userUtils';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto';
import { UserData, UserRO } from '../common/interfaces/user.interface';
import { CreateUserDto } from '../auth/dto';

const select = {
  email: true,
  username: true,
  bio: true,
  avatar: true,
  id: true,
  role: true,
  validEmail: true,
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
    try {
      return await this.prisma.user.findMany({ select });
    } catch (e) {
      throw new HttpException('USERS.FIND_ALL', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: CreateUserDto): Promise<UserData> {
    try {
      return await this.prisma.user.create({ data, select });
    } catch (e) {
      throw new HttpException('USERS.CREATE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(userData: UserData, data: UpdateUserDto): Promise<any> {
    try {
      if (hasPermission(userData?.id, data)) {
        const where = { id: userData?.id };
        const user = await this.prisma.user.update({ where, data, select });

        return { user };
      } else {
        throw new HttpException('USERS.UPDATE.FORBIDDEN', HttpStatus.FORBIDDEN);
      }
    } catch (e) {
      throw new HttpException('USERS.UPDATE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number, user: any): Promise<any> {
    try {
      if (hasPermission(id, user)) {
        return await this.prisma.user.delete({ where: { id }, select });
      } else {
        throw new HttpException('USERS.DELETE.FORBIDDEN', HttpStatus.FORBIDDEN);
      }
    } catch (e) {
      throw new HttpException('USERS.DELETE', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: number): Promise<UserRO | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: { id: true, ...select },
      });

      if (user) {
        return { user };
      }

      return null;
    } catch (e) {
      throw new HttpException('USERS.FIND_BY_ID', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByEmail(email: string, params: {} = {}): Promise<UserRO | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: {
          ...select,
          ...params,
        },
      });

      if (user) {
        return { user };
      }

      return null;
    } catch (e) {
      throw new HttpException('USERS.FIND_BY_EMAIL', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
