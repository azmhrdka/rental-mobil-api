import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  nama?: string;

  @IsOptional()
  @IsString()
  no_hp?: string;

  @IsOptional()
  @IsString()
  alamat?: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getProfile(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nama: true,
        email: true,
        no_hp: true,
        alamat: true,
        role: true,
        created_at: true,
      },
    });
    if (!user) throw new NotFoundException('User tidak ditemukan');
    return user;
  }

  async updateProfile(id: number, dto: UpdateProfileDto) {
    await this.getProfile(id);
    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        nama: true,
        email: true,
        no_hp: true,
        alamat: true,
        role: true,
        updated_at: true,
      },
    });
  }

  // Admin - lihat semua user
  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        nama: true,
        email: true,
        no_hp: true,
        role: true,
        created_at: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }
}