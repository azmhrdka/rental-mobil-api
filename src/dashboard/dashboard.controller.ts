import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Roles, RolesGuard } from '../auth/guard/roles.guard';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Roles('ADMIN')
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @ApiOperation({ summary: 'Statistik utama' })
  @Get()
  getStatistik() {
    return this.dashboardService.getStatistik();
  }

  @ApiOperation({ summary: 'Pendapatan per bulan' })
  @Get('pendapatan')
  getPendapatanPerBulan() {
    return this.dashboardService.getPendapatanPerBulan();
  }

  @ApiOperation({ summary: 'Mobil paling populer' })
  @Get('mobil-populer')
  getMobilPopuler() {
    return this.dashboardService.getMobilPopuler();
  }

  @ApiOperation({ summary: 'Pemesanan terbaru' })
  @Get('pemesanan-terbaru')
  getPemesananTerbaru() {
    return this.dashboardService.getPemesananTerbaru();
  }
}