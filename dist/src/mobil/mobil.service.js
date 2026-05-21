"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobilService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let MobilService = class MobilService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const where = {};
        if (query?.transmisi)
            where.transmisi = query.transmisi.toUpperCase();
        if (query?.kapasitas)
            where.kapasitas = parseInt(query.kapasitas);
        if (query?.harga_min || query?.harga_max) {
            where.harga_per_hari = {};
            if (query.harga_min)
                where.harga_per_hari.gte = parseFloat(query.harga_min);
            if (query.harga_max)
                where.harga_per_hari.lte = parseFloat(query.harga_max);
        }
        if (query?.search) {
            where.OR = [
                { nama_mobil: { contains: query.search, mode: 'insensitive' } },
                { merek: { contains: query.search, mode: 'insensitive' } },
                { model: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        const page = parseInt(query?.page) || 1;
        const limit = parseInt(query?.limit) || 10;
        const skip = (page - 1) * limit;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.mobil.findMany({
                where,
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.mobil.count({ where }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                total_halaman: Math.ceil(total / limit),
            },
        };
    }
    async findTersedia(query) {
        const where = { status: 'TERSEDIA' };
        if (query?.transmisi)
            where.transmisi = query.transmisi.toUpperCase();
        if (query?.kapasitas)
            where.kapasitas = parseInt(query.kapasitas);
        if (query?.harga_min || query?.harga_max) {
            where.harga_per_hari = {};
            if (query.harga_min)
                where.harga_per_hari.gte = parseFloat(query.harga_min);
            if (query.harga_max)
                where.harga_per_hari.lte = parseFloat(query.harga_max);
        }
        if (query?.search) {
            where.OR = [
                { nama_mobil: { contains: query.search, mode: 'insensitive' } },
                { merek: { contains: query.search, mode: 'insensitive' } },
                { model: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        const page = parseInt(query?.page) || 1;
        const limit = parseInt(query?.limit) || 10;
        const skip = (page - 1) * limit;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.mobil.findMany({
                where,
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.mobil.count({ where }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                total_halaman: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const mobil = await this.prisma.mobil.findUnique({ where: { id } });
        if (!mobil)
            throw new common_1.NotFoundException('Mobil tidak ditemukan');
        return mobil;
    }
    create(dto) {
        return this.prisma.mobil.create({
            data: {
                nama_mobil: dto.nama_mobil,
                merek: dto.merek,
                model: dto.model,
                tahun: dto.tahun,
                transmisi: dto.transmisi,
                kapasitas: dto.kapasitas,
                harga_per_hari: dto.harga_per_hari,
                deskripsi: dto.deskripsi,
            },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.mobil.update({
            where: { id },
            data: {
                ...dto,
                transmisi: dto.transmisi,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.mobil.delete({ where: { id } });
    }
    async updateStatus(id, status) {
        await this.findOne(id);
        return this.prisma.mobil.update({
            where: { id },
            data: { status: status },
        });
    }
    async uploadFoto(id, filename) {
        const mobil = await this.findOne(id);
        if (mobil.foto) {
            const oldPath = path.join(process.cwd(), 'uploads', 'mobil', mobil.foto);
            if (fs.existsSync(oldPath))
                fs.unlinkSync(oldPath);
        }
        return this.prisma.mobil.update({
            where: { id },
            data: { foto: filename },
        });
    }
    async cekKetersediaan(id, tanggal_mulai, tanggal_selesai) {
        const mobil = await this.findOne(id);
        const mulai = new Date(tanggal_mulai);
        const selesai = new Date(tanggal_selesai);
        if (mulai >= selesai) {
            throw new common_1.BadRequestException('Tanggal tidak valid');
        }
        const pemesananBentrok = await this.prisma.pemesanan.findFirst({
            where: {
                mobil_id: id,
                status: { notIn: ['DIBATALKAN', 'SELESAI'] },
                AND: [
                    { tanggal_mulai: { lte: selesai } },
                    { tanggal_selesai: { gte: mulai } },
                ],
            },
        });
        const tersedia = !pemesananBentrok;
        const total_hari = Math.ceil((selesai.getTime() - mulai.getTime()) / (1000 * 60 * 60 * 24));
        const estimasi_harga = tersedia
            ? Number(mobil.harga_per_hari) * total_hari
            : null;
        return {
            mobil_id: id,
            nama_mobil: mobil.nama_mobil,
            harga_per_hari: mobil.harga_per_hari,
            tanggal_mulai,
            tanggal_selesai,
            total_hari,
            tersedia,
            estimasi_harga,
            pesan: tersedia
                ? 'Mobil tersedia untuk tanggal tersebut'
                : 'Mobil tidak tersedia untuk tanggal tersebut',
        };
    }
};
exports.MobilService = MobilService;
exports.MobilService = MobilService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MobilService);
//# sourceMappingURL=mobil.service.js.map