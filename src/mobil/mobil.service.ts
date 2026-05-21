import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMobilDto } from './dto/create-mobil.dto';
import { UpdateMobilDto } from './dto/update-mobil.dto';
import { Transmisi } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MobilService {
  constructor(private prisma: PrismaService) {}

async findAll(query?: any) {
  const where: any = {};

  if (query?.transmisi) where.transmisi = query.transmisi.toUpperCase();
  if (query?.kapasitas) where.kapasitas = parseInt(query.kapasitas);
  if (query?.harga_min || query?.harga_max) {
    where.harga_per_hari = {};
    if (query.harga_min) where.harga_per_hari.gte = parseFloat(query.harga_min);
    if (query.harga_max) where.harga_per_hari.lte = parseFloat(query.harga_max);
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

async findTersedia(query?: any) {
  const where: any = { status: 'TERSEDIA' };

  if (query?.transmisi) where.transmisi = query.transmisi.toUpperCase();
  if (query?.kapasitas) where.kapasitas = parseInt(query.kapasitas);
  if (query?.harga_min || query?.harga_max) {
    where.harga_per_hari = {};
    if (query.harga_min) where.harga_per_hari.gte = parseFloat(query.harga_min);
    if (query.harga_max) where.harga_per_hari.lte = parseFloat(query.harga_max);
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
  async findOne(id: number) {
    const mobil = await this.prisma.mobil.findUnique({ where: { id } });
    if (!mobil) throw new NotFoundException('Mobil tidak ditemukan');
    return mobil;
  }

  create(dto: CreateMobilDto) {
    return this.prisma.mobil.create({
      data: {
        nama_mobil: dto.nama_mobil,
        merek: dto.merek,
        model: dto.model,
        tahun: dto.tahun,
        transmisi: dto.transmisi as Transmisi,
        kapasitas: dto.kapasitas,
        harga_per_hari: dto.harga_per_hari,
        deskripsi: dto.deskripsi,
      },
    });
  }

  async update(id: number, dto: UpdateMobilDto) {
    await this.findOne(id);
    return this.prisma.mobil.update({
      where: { id },
      data: {
        ...dto,
        transmisi: dto.transmisi as Transmisi | undefined,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.mobil.delete({ where: { id } });
  }

  async updateStatus(id: number, status: string) {
    await this.findOne(id);
    return this.prisma.mobil.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async uploadFoto(id: number, filename: string) {
    const mobil = await this.findOne(id);

    // Hapus foto lama jika ada
    if (mobil.foto) {
      const oldPath = path.join(process.cwd(), 'uploads', 'mobil', mobil.foto);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    return this.prisma.mobil.update({
      where: { id },
      data: { foto: filename },
    });
  }
    async cekKetersediaan(id: number, tanggal_mulai: string, tanggal_selesai: string) {
  const mobil = await this.findOne(id);

  const mulai = new Date(tanggal_mulai);
  const selesai = new Date(tanggal_selesai);

  if (mulai >= selesai) {
    throw new BadRequestException('Tanggal tidak valid');
  }

  // Cek apakah ada pemesanan yang bentrok
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
  const total_hari = Math.ceil(
    (selesai.getTime() - mulai.getTime()) / (1000 * 60 * 60 * 24),
  );
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
}