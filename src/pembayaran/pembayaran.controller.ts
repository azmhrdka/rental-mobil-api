import {
  Controller, Get, Post, Patch,
  Body, Param, ParseIntPipe,
  UseGuards, Req, UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { PembayaranService } from './pembayaran.service';
import { CreatePembayaranDto } from './dto/create-pembayaran.dto';
import { VerifikasiPembayaranDto } from './dto/verifikasi-pembayaran.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Roles, RolesGuard } from '../auth/guard/roles.guard';

@ApiTags('Pembayaran')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('pembayaran')
export class PembayaranController {
  constructor(private pembayaranService: PembayaranService) {}

  @ApiOperation({ summary: 'Buat pembayaran' })
  @Post()
  create(@Req() req, @Body() dto: CreatePembayaranDto) {
    return this.pembayaranService.create(req.user.id, dto);
  }

  @ApiOperation({ summary: 'Lihat pembayaran saya' })
  @Get('saya')
  findMine(@Req() req) {
    return this.pembayaranService.findByUser(req.user.id);
  }

  @ApiOperation({ summary: 'Lihat semua pembayaran (admin)' })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.pembayaranService.findAll();
  }

  @ApiOperation({ summary: 'Detail pembayaran' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pembayaranService.findOne(id);
  }

  @ApiOperation({ summary: 'Upload bukti transfer' })
  @ApiConsumes('multipart/form-data')
  @Patch(':id/bukti')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/bukti',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `bukti-${unique}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/image\/(jpg|jpeg|png)/)) {
          return cb(new Error('Hanya file JPG/PNG yang diizinkan'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadBukti(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.pembayaranService.uploadBukti(id, req.user.id, file.filename);
  }

  @ApiOperation({ summary: 'Verifikasi pembayaran (admin)' })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/verifikasi')
  verifikasi(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: VerifikasiPembayaranDto,
  ) {
    return this.pembayaranService.verifikasi(id, dto);
  }
}