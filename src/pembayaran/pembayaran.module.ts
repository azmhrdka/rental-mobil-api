import { Module } from '@nestjs/common';
import { PembayaranService } from './pembayaran.service';
import { PembayaranController } from './pembayaran.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({ dest: './uploads/bukti' }),
  ],
  controllers: [PembayaranController],
  providers: [PembayaranService],
})
export class PembayaranModule {}