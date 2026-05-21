import { IsEnum } from 'class-validator';

export class VerifikasiPembayaranDto {
  @IsEnum(['LUNAS', 'REFUND'])
  status: string;
}