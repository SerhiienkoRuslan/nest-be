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
    if (!await this.prisma.user.findOne({ where: { email: to }})) {
      throw new HttpException('Receiver of the message doesn\'t exist in the system', HttpStatus.BAD_REQUEST);
    }
    if (! await this.prisma.user.findOne({ where: { email: from }})) {
      throw new HttpException('Sender of the message doesn\'t exist in the system', HttpStatus.BAD_REQUEST);
    }
  }

  private async getRecipientToken(email: string): Promise<boolean> {
    return this.cacheManager.get(email);
  }

  async createMessage(data: CreateMessageDTO): Promise<MessageResponseDTO> {
    const { to, from } = data;
    await this.checkIfUsersExist(from, to);
    const message = this.prisma.message.create(data);
    const token = await this.getRecipientToken(to);
    const messageResponseObject = message.toResponseObject();
    if (token) {
      await this.gateway.wss.emit(token, messageResponseObject);
    }
    message.delivered = true;
    message.seen = false;
    await this.prisma.message.save(message);
    return messageResponseObject;
  }

  async getConversation(convoWith, user, options = { pageSize: 100, page: 0 }): Promise<MessagesResponseDTO> {
    // const queryBuilder = this.prisma.message.createQueryBuilder('message');
    //
    // if (convoWith !== user) {
    //   queryBuilder
    //     .where('message.from = :from and message.to = :to or message.from = :to and message.to = :from', { from: user, to: convoWith })
    //     .orderBy('message.createdDate', 'DESC');
    // } else {
    //   queryBuilder
    //     .where('message.from = :from and message.to = :to', { from: user, to: convoWith })
    //     .orderBy('message.createdDate', 'DESC');
    // }

    // const messages = await paginate<any>(queryBuilder, options);

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
      skip: options.pageSize * options.page,
      take: options.pageSize,
      orderBy: {
        createdDate: 'desc'
      }
    });

    const unseenCount = await this.prisma.message.count({
      from: convoWith,
      to: user,
      seen: false,
    });

    let seenCount = 0;

    if (messages.items) {
      for (const message of messages.items) {
        if (!message.seen) {
          ++seenCount;
          message.seen = true;
          this.prisma.message.save(message);
        }
      }
    }

    return {
      ...messages,
      unseenItems: unseenCount - seenCount,
    };
  }
}
