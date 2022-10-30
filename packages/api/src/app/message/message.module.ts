import {
  Module,
  CacheModule,
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
} from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { AppGateway } from '../app.gateway';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [MessageController],
  providers: [MessageService, AppGateway, PrismaService, UserService],
  exports: [MessageService],
})
export class MessageModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'message', method: RequestMethod.POST },
        { path: 'conversation', method: RequestMethod.GET },
      );
  }
}
