import { PrismaService } from '../prisma/prisma.service';
import { CreateMobilDto } from './dto/create-mobil.dto';
import { UpdateMobilDto } from './dto/update-mobil.dto';
export declare class MobilService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query?: any): Promise<{
        data: {
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
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            total_halaman: number;
        };
    }>;
    findTersedia(query?: any): Promise<{
        data: {
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
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            total_halaman: number;
        };
    }>;
    findOne(id: number): Promise<{
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
    }>;
    create(dto: CreateMobilDto): import(".prisma/client").Prisma.Prisma__MobilClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateMobilDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
    updateStatus(id: number, status: string): Promise<{
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
    }>;
    uploadFoto(id: number, filename: string): Promise<{
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
    }>;
    cekKetersediaan(id: number, tanggal_mulai: string, tanggal_selesai: string): Promise<{
        mobil_id: number;
        nama_mobil: string;
        harga_per_hari: import("@prisma/client/runtime/library").Decimal;
        tanggal_mulai: string;
        tanggal_selesai: string;
        total_hari: number;
        tersedia: boolean;
        estimasi_harga: number | null;
        pesan: string;
    }>;
}
