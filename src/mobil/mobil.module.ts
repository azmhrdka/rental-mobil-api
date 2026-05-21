import { Module } from '@nestjs/common';
import { MobilService } from './mobil.service';
import { MobilController } from './mobil.controller';

@Module({
  controllers: [MobilController],
  providers: [MobilService],
})
export class MobilModule {}