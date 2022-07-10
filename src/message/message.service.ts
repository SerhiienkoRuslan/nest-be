import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma.service";
import { CreateMessageDTO, MessageResponseDTO, MessagesResponseDTO } from "./dto";
import { AppGateway } from "../app.gateway";

@Injectable()
export class MessageService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager,
    private prisma: PrismaService,
    private gateway: AppGateway,
  ) {}

  private async checkIfUsersExist(from: string, to: string): Promise<void> {
    if (!await this.prisma.user.findUnique({ where: { email: to }})) {
      throw new HttpException('Receiver of the message doesn\'t exist in the system', HttpStatus.BAD_REQUEST);
    }
    if (! await this.prisma.user.findUnique({ where: { email: from }})) {
      throw new HttpException('Sender of the message doesn\'t exist in the system', HttpStatus.BAD_REQUEST);
    }
  }

  private async getRecipientToken(email: string): Promise<boolean> {
    return this.cacheManager.get(email);
  }

  async createMessage(data: CreateMessageDTO): Promise<MessageResponseDTO> {
    const { to, from } = data;
    await this.checkIfUsersExist(from, to);
    // @ts-ignore
    const message = this.prisma.message.create(data);
    const token = await this.getRecipientToken(to);
    if (token) {
      await this.gateway.wss.emit(token, message);
    }
    (await message).delivered = true;
    (await message).seen = false;
    // @ts-ignore
    await this.prisma.message.save(message);
    return message;
  }

  async getConversation(convoWith: string, user, options = { limit: 100, page: 0 }): Promise<MessagesResponseDTO> {
    const messages = await this.prisma.message.findMany({
      where: {
        OR: [
          {
            from: user.email,
            to: convoWith
          },
          {
            from: convoWith,
            to: user.email
          }
        ]
      },
      skip: options.limit * options.page,
      take: options.limit,
      orderBy: {
        createdDate: 'desc'
      }
    });

    const unseenCount = await this.prisma.message.count({
      // @ts-ignore
      from: convoWith,
      to: user,
      seen: false,
    });

    let seenCount = 0;

    // @ts-ignore
    if (messages.items) {
      // @ts-ignore
      for (const message of messages.items) {
        if (!message.seen) {
          ++seenCount;
          message.seen = true;
          // @ts-ignore
          this.prisma.message.save(message);
        }
      }
    }

    // @ts-ignore
    const { items, itemCount, pageCount } = messages

    return {
      items,
      itemCount,
      pageCount,
      unseenItems: unseenCount - seenCount,
    };
  }
}
