import {
  Controller, Get, Post, Put, Delete, Patch,
  Body, Param, ParseIntPipe, UseGuards,
  UploadedFile, UseInterceptors, Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiConsumes } from '@nestjs/swagger';
import { MobilService } from './mobil.service';
import { CreateMobilDto } from './dto/create-mobil.dto';
import { UpdateMobilDto } from './dto/update-mobil.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Roles, RolesGuard } from '../auth/guard/roles.guard';

@ApiTags('Mobil')
@Controller('mobil')
export class MobilController {
  constructor(private mobilService: MobilService) {}

  @ApiOperation({ summary: 'Ambil semua mobil' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'transmisi', required: false, enum: ['MANUAL', 'OTOMATIS'] })
  @ApiQuery({ name: 'kapasitas', required: false })
  @ApiQuery({ name: 'harga_min', required: false })
  @ApiQuery({ name: 'harga_max', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  findAll(@Query() query: any) {
    return this.mobilService.findAll(query);
  }

  @ApiOperation({ summary: 'Ambil mobil tersedia' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'transmisi', required: false, enum: ['MANUAL', 'OTOMATIS'] })
  @ApiQuery({ name: 'kapasitas', required: false })
  @ApiQuery({ name: 'harga_min', required: false })
  @ApiQuery({ name: 'harga_max', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get('tersedia')
  findTersedia(@Query() query: any) {
    return this.mobilService.findTersedia(query);
  }

  @ApiOperation({ summary: 'Cek ketersediaan mobil by tanggal' })
  @ApiQuery({ name: 'tanggal_mulai', required: true })
  @ApiQuery({ name: 'tanggal_selesai', required: true })
  @Get(':id/cek-ketersediaan')
  cekKetersediaan(
    @Param('id', ParseIntPipe) id: number,
    @Query('tanggal_mulai') tanggal_mulai: string,
    @Query('tanggal_selesai') tanggal_selesai: string,
  ) {
    return this.mobilService.cekKetersediaan(id, tanggal_mulai, tanggal_selesai);
  }

  @ApiOperation({ summary: 'Ambil detail mobil' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mobilService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tambah mobil (admin)' })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateMobilDto) {
    return this.mobilService.create(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update mobil (admin)' })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMobilDto) {
    return this.mobilService.update(id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus mobil (admin)' })
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mobilService.remove(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload foto mobil (admin)' })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/foto')
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads/mobil',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `mobil-${unique}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/image\/(jpg|jpeg|png|webp)/)) {
          return cb(new Error('Hanya file JPG/PNG/WEBP yang diizinkan'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadFoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.mobilService.uploadFoto(id, file.filename);
  }
}