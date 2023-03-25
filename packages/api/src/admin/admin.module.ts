import AdminJS from 'adminjs';
import '@adminjs/express';
import passwordsFeature from '@adminjs/passwords'
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
            options: {},
            features: [passwordsFeature({
              properties: { encryptedPassword: 'password' },
              hash: argon2.hash,
            })]
          },
          {
            resource: { model: dmmf.modelMap.Post, client: prisma },
            options: {}
          }
        ],
        // TODO: Uncomment Dashboard component
        // dashboard: {
        //   component: AdminJS.bundle('./pages/dashboard.tsx')
        // }
      },
      auth: {
        authenticate: async (email, password) => {
          const user = await prisma.user.findUnique({ where: { email } });

          if (user) {
            const { email, id } = user;
            const authenticated = await argon2.verify(user.password, password);

            // TODO: if (authenticated && user.role === 'ADMIN') {
            if (authenticated && user.role) {
              return { email, id: `${id}` }
            }
          }

          return null
        },
        cookiePassword: 'some-secret-password-used-to-secure-cookie',
        cookieName: 'nest-be-pass'
      }
    }
  }
})
