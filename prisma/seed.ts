import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@nestbe.com';
  const password = await argon2.hash(email);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      username: 'Nestbe Admin',
      password,
      role: 'ADMIN',
      validEmail: true,
      interests: ['some'],
    },
  });
  console.log('Admin created -', { admin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
