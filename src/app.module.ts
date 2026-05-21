import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MobilModule } from './mobil/mobil.module';
import { PemesananModule } from './pemesanan/pemesanan.module';
import { PembayaranModule } from './pembayaran/pembayaran.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    MobilModule,
    PemesananModule,
    PembayaranModule,
    DashboardModule,
  ],
})
export class AppModule {}