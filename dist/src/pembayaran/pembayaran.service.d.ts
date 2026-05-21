import { PrismaService } from '../prisma/prisma.service';
import { CreatePembayaranDto } from './dto/create-pembayaran.dto';
import { VerifikasiPembayaranDto } from './dto/verifikasi-pembayaran.dto';
export declare class PembayaranService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreatePembayaranDto): Promise<{
        pemesanan: {
            id: number;
            created_at: Date;
            updated_at: Date;
            status: import(".prisma/client").$Enums.StatusPemesanan;
            user_id: number;
            mobil_id: number;
            tanggal_mulai: Date;
            tanggal_selesai: Date;
            total_hari: number;
            total_harga: import("@prisma/client/runtime/library").Decimal;
            catatan: string | null;
        };
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.StatusPembayaran;
        pemesanan_id: number;
        jumlah: import("@prisma/client/runtime/library").Decimal;
        metode: import(".prisma/client").$Enums.MetodePembayaran;
        bukti_transfer: string | null;
        tanggal_bayar: Date | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        pemesanan: {
            user: {
                id: number;
                email: string;
                nama: string;
                password: string;
                no_hp: string | null;
                alamat: string | null;
                role: import(".prisma/client").$Enums.Role;
                created_at: Date;
                updated_at: Date;
            };
            mobil: {
                id: number;
                created_at: Date;
                updated_at: Date;
                nama_mobil: string;
                merek: string;
                model: string;
                tahun: number;
                transmisi: import(".prisma/client").$Enums.Transmisi;
                kapasitas: number;
                harga_per_hari: import("@prisma/client/runtime/library").Decimal;
                deskripsi: string | null;
                status: import(".prisma/client").$Enums.StatusMobil;
                foto: string | null;
            };
        } & {
            id: number;
            created_at: Date;
            updated_at: Date;
            status: import(".prisma/client").$Enums.StatusPemesanan;
            user_id: number;
            mobil_id: number;
            tanggal_mulai: Date;
            tanggal_selesai: Date;
            total_hari: number;
            total_harga: import("@prisma/client/runtime/library").Decimal;
            catatan: string | null;
        };
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.StatusPembayaran;
        pemesanan_id: number;
        jumlah: import("@prisma/client/runtime/library").Decimal;
        metode: import(".prisma/client").$Enums.MetodePembayaran;
        bukti_transfer: string | null;
        tanggal_bayar: Date | null;
    })[]>;
    findByUser(userId: number): import(".prisma/client").Prisma.PrismaPromise<({
        pemesanan: {
            mobil: {
                id: number;
                created_at: Date;
                updated_at: Date;
                nama_mobil: string;
                merek: string;
                model: string;
                tahun: number;
                transmisi: import(".prisma/client").$Enums.Transmisi;
                kapasitas: number;
                harga_per_hari: import("@prisma/client/runtime/library").Decimal;
                deskripsi: string | null;
                status: import(".prisma/client").$Enums.StatusMobil;
                foto: string | null;
            };
        } & {
            id: number;
            created_at: Date;
            updated_at: Date;
            status: import(".prisma/client").$Enums.StatusPemesanan;
            user_id: number;
            mobil_id: number;
            tanggal_mulai: Date;
            tanggal_selesai: Date;
            total_hari: number;
            total_harga: import("@prisma/client/runtime/library").Decimal;
            catatan: string | null;
        };
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.StatusPembayaran;
        pemesanan_id: number;
        jumlah: import("@prisma/client/runtime/library").Decimal;
        metode: import(".prisma/client").$Enums.MetodePembayaran;
        bukti_transfer: string | null;
        tanggal_bayar: Date | null;
    })[]>;
    findOne(id: number): Promise<{
        pemesanan: {
            user: {
                id: number;
                email: string;
                nama: string;
                password: string;
                no_hp: string | null;
                alamat: string | null;
                role: import(".prisma/client").$Enums.Role;
                created_at: Date;
                updated_at: Date;
            };
            mobil: {
                id: number;
                created_at: Date;
                updated_at: Date;
                nama_mobil: string;
                merek: string;
                model: string;
                tahun: number;
                transmisi: import(".prisma/client").$Enums.Transmisi;
                kapasitas: number;
                harga_per_hari: import("@prisma/client/runtime/library").Decimal;
                deskripsi: string | null;
                status: import(".prisma/client").$Enums.StatusMobil;
                foto: string | null;
            };
        } & {
            id: number;
            created_at: Date;
            updated_at: Date;
            status: import(".prisma/client").$Enums.StatusPemesanan;
            user_id: number;
            mobil_id: number;
            tanggal_mulai: Date;
            tanggal_selesai: Date;
            total_hari: number;
            total_harga: import("@prisma/client/runtime/library").Decimal;
            catatan: string | null;
        };
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.StatusPembayaran;
        pemesanan_id: number;
        jumlah: import("@prisma/client/runtime/library").Decimal;
        metode: import(".prisma/client").$Enums.MetodePembayaran;
        bukti_transfer: string | null;
        tanggal_bayar: Date | null;
    }>;
    verifikasi(id: number, dto: VerifikasiPembayaranDto): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.StatusPembayaran;
        pemesanan_id: number;
        jumlah: import("@prisma/client/runtime/library").Decimal;
        metode: import(".prisma/client").$Enums.MetodePembayaran;
        bukti_transfer: string | null;
        tanggal_bayar: Date | null;
    }>;
    uploadBukti(id: number, userId: number, filename: string): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.StatusPembayaran;
        pemesanan_id: number;
        jumlah: import("@prisma/client/runtime/library").Decimal;
        metode: import(".prisma/client").$Enums.MetodePembayaran;
        bukti_transfer: string | null;
        tanggal_bayar: Date | null;
    }>;
}
