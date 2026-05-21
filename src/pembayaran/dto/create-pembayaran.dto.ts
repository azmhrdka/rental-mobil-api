import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePembayaranDto {
  @IsInt()
  pemesanan_id: number;

  @IsEnum(['TRANSFER_BANK', 'TUNAI', 'QRIS'])
  metode: string;
}