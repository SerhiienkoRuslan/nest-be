import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [UserModule, MessageModule],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
