import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Cek apakah admin sudah ada
  const existing = await prisma.user.findUnique({
    where: { email: 'admin@rental.com' },
  });

  if (!existing) {
    const hash = await bcrypt.hash('admin123', 10);

    await prisma.user.create({
      data: {
        nama: 'Admin Rental',
        email: 'admin@rental.com',
        password: hash,
        role: 'ADMIN',
      },
    });

    console.log('✅ Admin berhasil dibuat!');
    console.log('   Email    : admin@rental.com');
    console.log('   Password : admin123');
  } else {
    console.log('⚠️  Admin sudah ada, skip.');
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());