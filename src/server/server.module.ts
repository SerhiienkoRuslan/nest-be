import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppModule } from 'src/server/app/app.module';
// import { ViewModule } from 'src/server/view/view.module';

@Module({
  imports: [
    AppModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
  ]
})
export class ServerModule {}
