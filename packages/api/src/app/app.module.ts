import { Module } from '@nestjs/common';

/** Admin */
import AdminModule from '../admin/admin.module';
/** APP */
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
/** AUTH */
import { AuthModule } from './auth/auth.module';
/** USER */
import { UserModule } from './user/user.module';
/** MESSAGE */
import { MessageModule } from './message/message.module';
import { MessageService } from './message/message.service';
/** POST */
import { PostModule } from './post/post.module';
/** PRISMA */
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [AuthModule, UserModule, MessageModule, PostModule, AdminModule],
  controllers: [AppController],
  providers: [AppGateway, MessageService, PrismaService],
})
export class AppModule {}
