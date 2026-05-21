import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePembayaranDto } from './dto/create-pembayaran.dto';
import { VerifikasiPembayaranDto } from './dto/verifikasi-pembayaran.dto';
import { MetodePembayaran, StatusPembayaran } from '@prisma/client';

@Injectable()
export class PembayaranService {
  constructor(private prisma: PrismaService) {}

  // Pelanggan buat pembayaran
  async create(userId: number, dto: CreatePembayaranDto) {
    // Cek pemesanan ada & milik user ini
    const pemesanan = await this.prisma.pemesanan.findUnique({
      where: { id: dto.pemesanan_id },
      include: { pembayaran: true },
    });

    if (!pemesanan) throw new NotFoundException('Pemesanan tidak ditemukan');
    if (pemesanan.user_id !== userId)
      throw new BadRequestException('Bukan pemesanan kamu');
    if (pemesanan.pembayaran)
      throw new BadRequestException('Pembayaran sudah dibuat');
    if (pemesanan.status === 'DIBATALKAN')
      throw new BadRequestException('Pemesanan sudah dibatalkan');

    return this.prisma.pembayaran.create({
      data: {
        pemesanan_id: dto.pemesanan_id,
        jumlah: pemesanan.total_harga,
        metode: dto.metode as MetodePembayaran,
        status: 'BELUM_BAYAR',
      },
      include: { pemesanan: true },
    });
  }

  // Ambil semua pembayaran (admin)
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

  // Ambil pembayaran milik user sendiri
  findByUser(userId: number) {
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

  // Detail pembayaran
  async findOne(id: number) {
    const pembayaran = await this.prisma.pembayaran.findUnique({
      where: { id },
      include: {
        pemesanan: { include: { user: true, mobil: true } },
      },
    });
    if (!pembayaran) throw new NotFoundException('Pembayaran tidak ditemukan');
    return pembayaran;
  }

  // Admin verifikasi pembayaran
  async verifikasi(id: number, dto: VerifikasiPembayaranDto) {
    const pembayaran = await this.findOne(id);

    if (pembayaran.status === 'LUNAS')
      throw new BadRequestException('Pembayaran sudah diverifikasi');

    const updatedPembayaran = await this.prisma.pembayaran.update({
      where: { id },
      data: {
        status: dto.status as StatusPembayaran,
        tanggal_bayar: new Date(),
      },
    });

    // Jika lunas, update status pemesanan jadi AKTIF
    if (dto.status === 'LUNAS') {
      await this.prisma.pemesanan.update({
        where: { id: pembayaran.pemesanan_id },
        data: { status: 'AKTIF' },
      });
    }

    return updatedPembayaran;
  }

  // Upload bukti transfer
  async uploadBukti(id: number, userId: number, filename: string) {
    const pembayaran = await this.findOne(id);

    if (pembayaran.pemesanan.user_id !== userId)
      throw new BadRequestException('Bukan pembayaran kamu');

    return this.prisma.pembayaran.update({
      where: { id },
      data: { bukti_transfer: filename },
    });
  }
}