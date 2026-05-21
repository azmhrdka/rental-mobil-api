import { Transmisi } from '@prisma/client';
export declare class CreateMobilDto {
    nama_mobil: string;
    merek: string;
    model: string;
    tahun: number;
    transmisi: Transmisi;
    kapasitas: number;
    harga_per_hari: number;
    deskripsi?: string;
}
