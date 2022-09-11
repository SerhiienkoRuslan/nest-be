import AdminJS from 'adminjs';
import '@adminjs/express';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/prisma';
import { DMMFClass } from '@prisma/client/runtime';
import { PrismaService } from "../prisma/prisma.service";
import { PrismaModule } from "../prisma/prisma.module";
import * as argon2 from "argon2";

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
        ],
        dashboard: {
          component: AdminJS.bundle('./pages/dashboard')
        }
      },
      auth: {
        authenticate: async (email, password) => {
          const user = await dmmf.modelMap.User.findOne({ email })
          if (user) {
            const authenticated = await argon2.verify(user.password, password);
            if (authenticated) {
              return user
            }
          }
          return false
        },
        cookiePassword: 'some-secret-password-used-to-secure-cookie',
        cookieName: 'nest-be-pass'
      }
    }
  }
})
