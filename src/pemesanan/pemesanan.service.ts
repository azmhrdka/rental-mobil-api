import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePemesananDto } from './dto/create-pemesanan.dto';

@Injectable()
export class PemesananService {
  constructor(private prisma: PrismaService) {}

  // Hitung total hari
  private hitungHari(mulai: string, selesai: string): number {
    const start = new Date(mulai);
    const end = new Date(selesai);
    const diff = end.getTime() - start.getTime();
    const hari = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (hari <= 0) throw new BadRequestException('Tanggal tidak valid');
    return hari;
  }

  // Buat pemesanan baru
  async create(userId: number, dto: CreatePemesananDto) {
    // Cek mobil ada & tersedia
    const mobil = await this.prisma.mobil.findUnique({
      where: { id: dto.mobil_id },
    });
    if (!mobil) throw new NotFoundException('Mobil tidak ditemukan');
    if (mobil.status !== 'TERSEDIA')
      throw new BadRequestException('Mobil tidak tersedia');

    // Hitung total
    const total_hari = this.hitungHari(dto.tanggal_mulai, dto.tanggal_selesai);
    const total_harga = Number(mobil.harga_per_hari) * total_hari;

    // Buat pemesanan & update status mobil
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

  // Ambil semua pemesanan (admin)
  findAll() {
    return this.prisma.pemesanan.findMany({
      include: { mobil: true, user: true, pembayaran: true },
      orderBy: { created_at: 'desc' },
    });
  }

  // Ambil pemesanan milik user sendiri
  findByUser(userId: number) {
    return this.prisma.pemesanan.findMany({
      where: { user_id: userId },
      include: { mobil: true, pembayaran: true },
      orderBy: { created_at: 'desc' },
    });
  }

  // Ambil detail pemesanan
  async findOne(id: number) {
    const pemesanan = await this.prisma.pemesanan.findUnique({
      where: { id },
      include: { mobil: true, user: true, pembayaran: true },
    });
    if (!pemesanan) throw new NotFoundException('Pemesanan tidak ditemukan');
    return pemesanan;
  }

  // Konfirmasi pemesanan (admin)
  async konfirmasi(id: number) {
    await this.findOne(id);
    return this.prisma.pemesanan.update({
      where: { id },
      data: { status: 'DIKONFIRMASI' },
    });
  }

  // Selesaikan pemesanan (admin)
  async selesai(id: number) {
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

  // Batalkan pemesanan
  async batalkan(id: number) {
    const pemesanan = await this.findOne(id);
    if (['SELESAI', 'DIBATALKAN'].includes(pemesanan.status))
      throw new BadRequestException('Pemesanan tidak bisa dibatalkan');

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
}