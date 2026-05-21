import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getStatistik(): Promise<{
        mobil: {
            total: number;
            tersedia: number;
            disewa: number;
            perawatan: number;
        };
        pelanggan: {
            total: number;
        };
        pemesanan: {
            total: number;
            pending: number;
            aktif: number;
            selesai: number;
            dibatalkan: number;
        };
        keuangan: {
            total_pendapatan: number | import("@prisma/client/runtime/library").Decimal;
        };
    }>;
    getPendapatanPerBulan(): Promise<{
        tahun: number;
        data: {
            bulan: number;
            nama_bulan: string;
            total: number;
        }[];
    }>;
    getMobilPopuler(): Promise<{
        total_disewa: number;
        id?: number | undefined;
        nama_mobil?: string | undefined;
        merek?: string | undefined;
        foto?: string | null | undefined;
    }[]>;
    getPemesananTerbaru(): Promise<({
        user: {
            id: number;
            email: string;
            nama: string;
        };
        mobil: {
            id: number;
            nama_mobil: string;
            merek: string;
        };
        pembayaran: {
            status: import(".prisma/client").$Enums.StatusPembayaran;
            metode: import(".prisma/client").$Enums.MetodePembayaran;
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
}
