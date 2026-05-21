import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePemesananDto {
  @IsInt()
  mobil_id: number;

  @IsDateString()
  tanggal_mulai: string;

  @IsDateString()
  tanggal_selesai: string;

  @IsOptional()
  @IsString()
  catatan?: string;
}