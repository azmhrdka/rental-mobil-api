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
exports.PembayaranService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PembayaranService = class PembayaranService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const pemesanan = await this.prisma.pemesanan.findUnique({
            where: { id: dto.pemesanan_id },
            include: { pembayaran: true },
        });
        if (!pemesanan)
            throw new common_1.NotFoundException('Pemesanan tidak ditemukan');
        if (pemesanan.user_id !== userId)
            throw new common_1.BadRequestException('Bukan pemesanan kamu');
        if (pemesanan.pembayaran)
            throw new common_1.BadRequestException('Pembayaran sudah dibuat');
        if (pemesanan.status === 'DIBATALKAN')
            throw new common_1.BadRequestException('Pemesanan sudah dibatalkan');
        return this.prisma.pembayaran.create({
            data: {
                pemesanan_id: dto.pemesanan_id,
                jumlah: pemesanan.total_harga,
                metode: dto.metode,
                status: 'BELUM_BAYAR',
            },
            include: { pemesanan: true },
        });
    }
    findAll() {
        return this.prisma.pembayaran.findMany({
            include: {
                pemesanan: {
                    include: { user: true, mobil: true },
                },
            },
            orderBy: { created_at: 'desc' },
        });
    }
    findByUser(userId) {
        return this.prisma.pembayaran.findMany({
            where: {
                pemesanan: { user_id: userId },
            },
            include: {
                pemesanan: { include: { mobil: true } },
            },
            orderBy: { created_at: 'desc' },
        });
    }
    async findOne(id) {
        const pembayaran = await this.prisma.pembayaran.findUnique({
            where: { id },
            include: {
                pemesanan: { include: { user: true, mobil: true } },
            },
        });
        if (!pembayaran)
            throw new common_1.NotFoundException('Pembayaran tidak ditemukan');
        return pembayaran;
    }
    async verifikasi(id, dto) {
        const pembayaran = await this.findOne(id);
        if (pembayaran.status === 'LUNAS')
            throw new common_1.BadRequestException('Pembayaran sudah diverifikasi');
        const updatedPembayaran = await this.prisma.pembayaran.update({
            where: { id },
            data: {
                status: dto.status,
                tanggal_bayar: new Date(),
            },
        });
        if (dto.status === 'LUNAS') {
            await this.prisma.pemesanan.update({
                where: { id: pembayaran.pemesanan_id },
                data: { status: 'AKTIF' },
            });
        }
        return updatedPembayaran;
    }
    async uploadBukti(id, userId, filename) {
        const pembayaran = await this.findOne(id);
        if (pembayaran.pemesanan.user_id !== userId)
            throw new common_1.BadRequestException('Bukan pembayaran kamu');
        return this.prisma.pembayaran.update({
            where: { id },
            data: { bukti_transfer: filename },
        });
    }
};
exports.PembayaranService = PembayaranService;
exports.PembayaranService = PembayaranService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PembayaranService);
//# sourceMappingURL=pembayaran.service.js.map