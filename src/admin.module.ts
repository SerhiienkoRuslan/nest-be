import AdminJS from 'adminjs';
import '@adminjs/express';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/prisma';
import { DMMFClass } from '@prisma/client/runtime';
import { PrismaService } from "./prisma/prisma.service";
import { PrismaModule } from "./prisma/prisma.module";

AdminJS.registerAdapter({ Database, Resource });

export default AdminModule.createAdminAsync({
  imports: [PrismaModule],
  inject: [PrismaService],
  useFactory: async (prisma: PrismaService) => {
    const dmmf = ((prisma as any)._baseDmmf as DMMFClass)
    return {
      adminJsOptions: {
        rootPath: '/admin',
        resources: [
          {
            resource: { model: dmmf.modelMap.User, client: prisma },
            options: {}
          },
          {
            resource: { model: dmmf.modelMap.Post, client: prisma },
            options: {}
          }
        ]
      }
    }
  }
})
