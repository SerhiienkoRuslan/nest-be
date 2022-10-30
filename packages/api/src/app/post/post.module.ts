import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AuthMiddleware } from '../../middleware/auth.middleware';
import { PrismaService } from '../../prisma/prisma.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserService } from "../user/user.service";

@Module({
  providers: [PostService, PrismaService, UserService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'posts', method: RequestMethod.GET },
        { path: 'post', method: RequestMethod.GET },
        { path: 'my-posts', method: RequestMethod.GET },
        { path: 'post', method: RequestMethod.PUT },
        { path: 'post', method: RequestMethod.DELETE },
      );
  }
}
