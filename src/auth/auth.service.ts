import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Cek email sudah ada
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email sudah terdaftar');

    // Hash password
    const hash = await bcrypt.hash(dto.password, 10);

    // Simpan user
    const user = await this.prisma.user.create({
      data: {
        nama: dto.nama,
        email: dto.email,
        password: hash,
        no_hp: dto.no_hp,
        alamat: dto.alamat,
      },
    });

    return {
      message: 'Registrasi berhasil, silakan login',
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
  },
};
  }

  async login(dto: LoginDto) {
    // Cari user
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Email atau password salah');

    // Cek password
    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Email atau password salah');

    return this.signToken(user.id, user.email, user.role);
  }

  private async signToken(id: number, email: string, role: string) {
    const payload = { sub: id, email, role };
    const token = await this.jwt.signAsync(payload);

    return {
      access_token: token,
      user: { id, email, role },
    };
  }
}