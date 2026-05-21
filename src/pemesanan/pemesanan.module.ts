import { Module } from '@nestjs/common';
import { PemesananService } from './pemesanan.service';
import { PemesananController } from './pemesanan.controller';

@Module({
  controllers: [PemesananController],
  providers: [PemesananService],
})
export class PemesananModule {}