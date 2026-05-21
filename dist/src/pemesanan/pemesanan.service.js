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
exports.PemesananService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PemesananService = class PemesananService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    hitungHari(mulai, selesai) {
        const start = new Date(mulai);
        const end = new Date(selesai);
        const diff = end.getTime() - start.getTime();
        const hari = Math.ceil(diff / (1000 * 60 * 60 * 24));
        if (hari <= 0)
            throw new common_1.BadRequestException('Tanggal tidak valid');
        return hari;
    }
    async create(userId, dto) {
        const mobil = await this.prisma.mobil.findUnique({
            where: { id: dto.mobil_id },
        });
        if (!mobil)
            throw new common_1.NotFoundException('Mobil tidak ditemukan');
        if (mobil.status !== 'TERSEDIA')
            throw new common_1.BadRequestException('Mobil tidak tersedia');
        const total_hari = this.hitungHari(dto.tanggal_mulai, dto.tanggal_selesai);
        const total_harga = Number(mobil.harga_per_hari) * total_hari;
        const [pemesanan] = await this.prisma.$transaction([
            this.prisma.pemesanan.create({
                data: {
                    user_id: userId,
                    mobil_id: dto.mobil_id,
                    tanggal_mulai: new Date(dto.tanggal_mulai),
                    tanggal_selesai: new Date(dto.tanggal_selesai),
                    total_hari,
                    total_harga,
                    catatan: dto.catatan,
                },
                include: { mobil: true, user: true },
            }),
            this.prisma.mobil.update({
                where: { id: dto.mobil_id },
                data: { status: 'DISEWA' },
            }),
        ]);
        return pemesanan;
    }
    findAll() {
        return this.prisma.pemesanan.findMany({
            include: { mobil: true, user: true, pembayaran: true },
            orderBy: { created_at: 'desc' },
        });
    }
    findByUser(userId) {
        return this.prisma.pemesanan.findMany({
            where: { user_id: userId },
            include: { mobil: true, pembayaran: true },
            orderBy: { created_at: 'desc' },
        });
    }
    async findOne(id) {
        const pemesanan = await this.prisma.pemesanan.findUnique({
            where: { id },
            include: { mobil: true, user: true, pembayaran: true },
        });
        if (!pemesanan)
            throw new common_1.NotFoundException('Pemesanan tidak ditemukan');
        return pemesanan;
    }
    async konfirmasi(id) {
        await this.findOne(id);
        return this.prisma.pemesanan.update({
            where: { id },
            data: { status: 'DIKONFIRMASI' },
        });
    }
    async selesai(id) {
        const pemesanan = await this.findOne(id);
        await this.prisma.$transaction([
            this.prisma.pemesanan.update({
                where: { id },
                data: { status: 'SELESAI' },
            }),
            this.prisma.mobil.update({
                where: { id: pemesanan.mobil_id },
                data: { status: 'TERSEDIA' },
            }),
        ]);
        return { message: 'Pemesanan selesai, mobil tersedia kembali' };
    }
    async batalkan(id) {
        const pemesanan = await this.findOne(id);
        if (['SELESAI', 'DIBATALKAN'].includes(pemesanan.status))
            throw new common_1.BadRequestException('Pemesanan tidak bisa dibatalkan');
        await this.prisma.$transaction([
            this.prisma.pemesanan.update({
                where: { id },
                data: { status: 'DIBATALKAN' },
            }),
            this.prisma.mobil.update({
                where: { id: pemesanan.mobil_id },
                data: { status: 'TERSEDIA' },
            }),
        ]);
        return { message: 'Pemesanan berhasil dibatalkan' };
    }
};
exports.PemesananService = PemesananService;
exports.PemesananService = PemesananService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PemesananService);
//# sourceMappingURL=pemesanan.service.js.map