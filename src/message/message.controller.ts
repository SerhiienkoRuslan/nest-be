import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDTO, MessageResponseDTO } from './dto';
import { User } from "../user/user.decorator";
import { UserData } from "../user/user.interface";

@Controller()
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('message')
  @UsePipes(new ValidationPipe())
  async createMessage(@Body() data: CreateMessageDTO): Promise<MessageResponseDTO> {
    return this.messageService.createMessage(data);
  }

  @Get('conversation')
  async index(
    @Query('with') convoWith: string,
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
    @User() user: UserData
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.messageService.getConversation(convoWith, user, { page, limit });
  }
}