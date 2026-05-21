import {
  Controller, Get, Post, Patch,
  Body, Param, ParseIntPipe, UseGuards, Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PemesananService } from './pemesanan.service';
import { CreatePemesananDto } from './dto/create-pemesanan.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Roles, RolesGuard } from '../auth/guard/roles.guard';

@ApiTags('Pemesanan')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('pemesanan')
export class PemesananController {
  constructor(private pemesananService: PemesananService) {}

  @ApiOperation({ summary: 'Buat pemesanan baru' })
  @Post()
  create(@Req() req, @Body() dto: CreatePemesananDto) {
    return this.pemesananService.create(req.user.id, dto);
  }

  @ApiOperation({ summary: 'Lihat pemesanan saya' })
  @Get('saya')
  findMine(@Req() req) {
    return this.pemesananService.findByUser(req.user.id);
  }

  @ApiOperation({ summary: 'Lihat semua pemesanan (admin)' })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.pemesananService.findAll();
  }

  @ApiOperation({ summary: 'Detail pemesanan' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pemesananService.findOne(id);
  }

  @ApiOperation({ summary: 'Konfirmasi pemesanan (admin)' })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/konfirmasi')
  konfirmasi(@Param('id', ParseIntPipe) id: number) {
    return this.pemesananService.konfirmasi(id);
  }

  @ApiOperation({ summary: 'Selesaikan pemesanan (admin)' })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/selesai')
  selesai(@Param('id', ParseIntPipe) id: number) {
    return this.pemesananService.selesai(id);
  }

  @ApiOperation({ summary: 'Batalkan pemesanan' })
  @Patch(':id/batalkan')
  batalkan(@Param('id', ParseIntPipe) id: number) {
    return this.pemesananService.batalkan(id);
  }
}