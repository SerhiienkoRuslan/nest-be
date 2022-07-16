import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { MessageService } from './message/message.service'

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private messageService: MessageService) {}

  @WebSocketServer() server: Server;

  private logger = new Logger('AppGateway');

  @SubscribeMessage('message')
  async handleSendMessage(client: Socket, payload): Promise<void> {
    await this.messageService.createMessage(payload);
    this.server.emit('message', payload);
  }

  handleConnection(client: { emit: (arg0: string, arg1: string) => void; }) {
    this.logger.log('New client connected');
    client.emit('connection', 'Successfully connected to server');
  }

  handleDisconnect(client: any) {
    this.logger.log('Client disconnected');
  }
}
