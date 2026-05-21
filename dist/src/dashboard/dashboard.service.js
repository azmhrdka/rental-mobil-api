"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStatistik() {
        const [totalMobil, mobilTersedia, mobilDisewa, mobilPerawatan, totalPelanggan, totalPemesanan, pemesananPending, pemesananAktif, pemesananSelesai, pemesananDibatalkan, totalPendapatan,] = await this.prisma.$transaction([
            this.prisma.mobil.count(),
            this.prisma.mobil.count({ where: { status: 'TERSEDIA' } }),
            this.prisma.mobil.count({ where: { status: 'DISEWA' } }),
            this.prisma.mobil.count({ where: { status: 'PERAWATAN' } }),
            this.prisma.user.count({ where: { role: 'PELANGGAN' } }),
            this.prisma.pemesanan.count(),
            this.prisma.pemesanan.count({ where: { status: 'PENDING' } }),
            this.prisma.pemesanan.count({ where: { status: 'AKTIF' } }),
            this.prisma.pemesanan.count({ where: { status: 'SELESAI' } }),
            this.prisma.pemesanan.count({ where: { status: 'DIBATALKAN' } }),
            this.prisma.pembayaran.aggregate({
                where: { status: 'LUNAS' },
                _sum: { jumlah: true },
            }),
        ]);
        return {
            mobil: {
                total: totalMobil,
                tersedia: mobilTersedia,
                disewa: mobilDisewa,
                perawatan: mobilPerawatan,
            },
            pelanggan: {
                total: totalPelanggan,
            },
            pemesanan: {
                total: totalPemesanan,
                pending: pemesananPending,
                aktif: pemesananAktif,
                selesai: pemesananSelesai,
                dibatalkan: pemesananDibatalkan,
            },
            keuangan: {
                total_pendapatan: totalPendapatan._sum.jumlah ?? 0,
            },
        };
    }
    async getPendapatanPerBulan() {
        const tahunIni = new Date().getFullYear();
        const pembayaran = await this.prisma.pembayaran.findMany({
            where: {
                status: 'LUNAS',
                tanggal_bayar: {
                    gte: new Date(`${tahunIni}-01-01`),
                    lte: new Date(`${tahunIni}-12-31`),
                },
            },
            select: {
                jumlah: true,
                tanggal_bayar: true,
            },
        });
        const perBulan = Array.from({ length: 12 }, (_, i) => ({
            bulan: i + 1,
            nama_bulan: new Date(tahunIni, i, 1).toLocaleString('id-ID', { month: 'long' }),
            total: 0,
        }));
        pembayaran.forEach((p) => {
            if (!p.tanggal_bayar)
                return;
            const bulan = new Date(p.tanggal_bayar).getMonth();
            perBulan[bulan].total += Number(p.jumlah);
        });
        return { tahun: tahunIni, data: perBulan };
    }
    async getMobilPopuler() {
        const mobil = await this.prisma.pemesanan.groupBy({
            by: ['mobil_id'],
            where: { status: { notIn: ['DIBATALKAN'] } },
            _count: { mobil_id: true },
            orderBy: { _count: { mobil_id: 'desc' } },
            take: 5,
        });
        const result = await Promise.all(mobil.map(async (item) => {
            const detail = await this.prisma.mobil.findUnique({
                where: { id: item.mobil_id },
                select: { id: true, nama_mobil: true, merek: true, foto: true },
            });
            return {
                ...detail,
                total_disewa: item._count.mobil_id,
            };
        }));
        return result;
    }
    async getPemesananTerbaru() {
        return this.prisma.pemesanan.findMany({
            take: 10,
            orderBy: { created_at: 'desc' },
            include: {
                user: {
                    select: { id: true, nama: true, email: true },
                },
                mobil: {
                    select: { id: true, nama_mobil: true, merek: true },
                },
                pembayaran: {
                    select: { status: true, metode: true },
                },
            },
        });
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map