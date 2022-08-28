import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AuthMiddleware } from '../middleware/auth.middleware';
import { PrismaService } from '../prisma/prisma.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.PUT },
        { path: 'user', method: RequestMethod.DELETE },
      );
  }
}
