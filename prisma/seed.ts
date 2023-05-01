import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'nestbe-admin@nestbe.com' },
    update: {},
    create: {
      email: 'nestbe-admin@nestbe.com',
      username: 'Nestbe Admin',
      password: 'nestbe-admin@nestbe.com',
      role: 'ADMIN',
    },
  });
  console.log('Admin created', { admin });
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
