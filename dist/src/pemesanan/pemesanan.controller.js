"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PemesananController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pemesanan_service_1 = require("./pemesanan.service");
const create_pemesanan_dto_1 = require("./dto/create-pemesanan.dto");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const roles_guard_1 = require("../auth/guard/roles.guard");
let PemesananController = class PemesananController {
    pemesananService;
    constructor(pemesananService) {
        this.pemesananService = pemesananService;
    }
    create(req, dto) {
        return this.pemesananService.create(req.user.id, dto);
    }
    findMine(req) {
        return this.pemesananService.findByUser(req.user.id);
    }
    findAll() {
        return this.pemesananService.findAll();
    }
    findOne(id) {
        return this.pemesananService.findOne(id);
    }
    konfirmasi(id) {
        return this.pemesananService.konfirmasi(id);
    }
    selesai(id) {
        return this.pemesananService.selesai(id);
    }
    batalkan(id) {
        return this.pemesananService.batalkan(id);
    }
};
exports.PemesananController = PemesananController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Buat pemesanan baru' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_pemesanan_dto_1.CreatePemesananDto]),
    __metadata("design:returntype", void 0)
], PemesananController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lihat pemesanan saya' }),
    (0, common_1.Get)('saya'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PemesananController.prototype, "findMine", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lihat semua pemesanan (admin)' }),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_guard_1.Roles)('ADMIN'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PemesananController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Detail pemesanan' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PemesananController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Konfirmasi pemesanan (admin)' }),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_guard_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id/konfirmasi'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PemesananController.prototype, "konfirmasi", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Selesaikan pemesanan (admin)' }),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_guard_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id/selesai'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PemesananController.prototype, "selesai", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Batalkan pemesanan' }),
    (0, common_1.Patch)(':id/batalkan'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PemesananController.prototype, "batalkan", null);
exports.PemesananController = PemesananController = __decorate([
    (0, swagger_1.ApiTags)('Pemesanan'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('pemesanan'),
    __metadata("design:paramtypes", [pemesanan_service_1.PemesananService])
], PemesananController);
//# sourceMappingURL=pemesanan.controller.js.map