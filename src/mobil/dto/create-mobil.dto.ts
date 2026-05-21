import { Transmisi } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMobilDto {
  @IsNotEmpty()
  nama_mobil: string;

  @IsNotEmpty()
  merek: string;

  @IsNotEmpty()
  model: string;

  @IsInt()
  tahun: number;

  @IsEnum(Transmisi)
  transmisi: Transmisi;

  @IsInt()
  kapasitas: number;

  @IsNumber()
  harga_per_hari: number;

  @IsOptional()
  @IsString()
  deskripsi?: string;
}