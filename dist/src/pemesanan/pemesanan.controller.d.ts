import { PemesananService } from './pemesanan.service';
import { CreatePemesananDto } from './dto/create-pemesanan.dto';
export declare class PemesananController {
    private pemesananService;
    constructor(pemesananService: PemesananService);
    create(req: any, dto: CreatePemesananDto): Promise<{
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
    }>;
    findMine(req: any): import(".prisma/client").Prisma.PrismaPromise<({
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
        pembayaran: {
            id: number;
            created_at: Date;
            updated_at: Date;
            status: import(".prisma/client").$Enums.StatusPembayaran;
            pemesanan_id: number;
            jumlah: import("@prisma/client/runtime/library").Decimal;
            metode: import(".prisma/client").$Enums.MetodePembayaran;
            bukti_transfer: string | null;
            tanggal_bayar: Date | null;
        } | null;
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
    })[]>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
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
        pembayaran: {
            id: number;
            created_at: Date;
            updated_at: Date;
            status: import(".prisma/client").$Enums.StatusPembayaran;
            pemesanan_id: number;
            jumlah: import("@prisma/client/runtime/library").Decimal;
            metode: import(".prisma/client").$Enums.MetodePembayaran;
            bukti_transfer: string | null;
            tanggal_bayar: Date | null;
        } | null;
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
    })[]>;
    findOne(id: number): Promise<{
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
        pembayaran: {
            id: number;
            created_at: Date;
            updated_at: Date;
            status: import(".prisma/client").$Enums.StatusPembayaran;
            pemesanan_id: number;
            jumlah: import("@prisma/client/runtime/library").Decimal;
            metode: import(".prisma/client").$Enums.MetodePembayaran;
            bukti_transfer: string | null;
            tanggal_bayar: Date | null;
        } | null;
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
    }>;
    konfirmasi(id: number): Promise<{
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
    }>;
    selesai(id: number): Promise<{
        message: string;
    }>;
    batalkan(id: number): Promise<{
        message: string;
    }>;
}
