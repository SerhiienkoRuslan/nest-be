import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { MessageService } from './message.service';
import { CreateMessageDTO, MessageResponseDTO } from './dto';

@Controller()
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('message')
  @UsePipes(new ValidationPipe())
  async createMessage(@Body() data: CreateMessageDTO): Promise<MessageResponseDTO> {
    return this.messageService.createMessage(data);
  }

  @Get('conversation')
  async index(@Query('with') convoWith: string, @Query('page') page: number = 0,
              @Query('limit') limit: number = 10,
              @Req() req: Request) {
    limit = limit > 100 ? 100 : limit;
    return await this.messageService.getConversation(convoWith, req.body.from, { page, limit });
  }
}