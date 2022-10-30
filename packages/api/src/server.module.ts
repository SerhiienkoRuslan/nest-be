import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { AppModule } from 'src/app/app.module';

@Module({
  imports: [
    AppModule,
    ConfigModule.forRoot()
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client'),
    //   exclude: ['/api*']
    // })
  ]
})
export class ServerModule {}
