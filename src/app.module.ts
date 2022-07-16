import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { MessageService } from './message/message.service';
import { AppGateway } from './app.gateway';
import { PrismaService } from "./prisma.service";

@Module({
  imports: [UserModule, MessageModule],
  controllers: [AppController],
  providers: [AppGateway, MessageService, PrismaService],
})
export class AppModule {}
