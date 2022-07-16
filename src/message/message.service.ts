import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import {
  CreateMessageDTO,
  MessageResponseDTO,
  MessagesResponseDTO,
} from './dto';

const select = {
  from: true,
  to: true,
  message: true,
};

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  private async checkIfUsersExist(from: string, to: string): Promise<void> {
    if (!(await this.prisma.user.findUnique({ where: { email: to } }))) {
      throw new HttpException(
        "Receiver of the message doesn't exist in the system",
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!(await this.prisma.user.findUnique({ where: { email: from } }))) {
      throw new HttpException(
        "Sender of the message doesn't exist in the system",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createMessage(data: CreateMessageDTO): Promise<MessageResponseDTO> {
    const { to, from } = data;
    await this.checkIfUsersExist(from, to);
    return this.prisma.message.create({
      data: { ...data, delivered: true, seen: false },
      select,
    });
  }

  async getConversation(
    conversationWith: string,
    user,
    options = { limit: 100, page: 0 },
  ): Promise<MessagesResponseDTO> {
    const messages = await this.prisma.message.findMany({
      where: {
        OR: [
          {
            from: user.email,
            to: conversationWith,
          },
          {
            from: conversationWith,
            to: user.email,
          },
        ],
      },
      skip: options.limit * options.page,
      take: options.limit,
      orderBy: {
        createdDate: 'desc',
      },
    });

    const unseenCount = await this.prisma.message.count({
      where: {
        from: conversationWith,
        to: user.email,
        seen: false,
      },
    });

    const itemCount = await this.prisma.message.count({
      where: {
        from: conversationWith,
        to: user.email,
      },
    });

    let seenCount = 0;

    if (messages.length) {
      for (const message of messages) {
        if (!message.seen) {
          ++seenCount;
          message.seen = true;
          this.prisma.message.update({
            where: {
              id: message.id,
            },
            data: message,
          });
        }
      }
    }

    return {
      items: messages,
      itemCount,
      pageCount: Math.ceil(itemCount / options.limit),
      unseenItems: unseenCount - seenCount,
    };
  }
}
