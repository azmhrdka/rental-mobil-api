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
exports.PembayaranController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
const pembayaran_service_1 = require("./pembayaran.service");
const create_pembayaran_dto_1 = require("./dto/create-pembayaran.dto");
const verifikasi_pembayaran_dto_1 = require("./dto/verifikasi-pembayaran.dto");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const roles_guard_1 = require("../auth/guard/roles.guard");
let PembayaranController = class PembayaranController {
    pembayaranService;
    constructor(pembayaranService) {
        this.pembayaranService = pembayaranService;
    }
    create(req, dto) {
        return this.pembayaranService.create(req.user.id, dto);
    }
    findMine(req) {
        return this.pembayaranService.findByUser(req.user.id);
    }
    findAll() {
        return this.pembayaranService.findAll();
    }
    findOne(id) {
        return this.pembayaranService.findOne(id);
    }
    uploadBukti(id, req, file) {
        return this.pembayaranService.uploadBukti(id, req.user.id, file.filename);
    }
    verifikasi(id, dto) {
        return this.pembayaranService.verifikasi(id, dto);
    }
};
exports.PembayaranController = PembayaranController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Buat pembayaran' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_pembayaran_dto_1.CreatePembayaranDto]),
    __metadata("design:returntype", void 0)
], PembayaranController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lihat pembayaran saya' }),
    (0, common_1.Get)('saya'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PembayaranController.prototype, "findMine", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lihat semua pembayaran (admin)' }),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_guard_1.Roles)('ADMIN'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PembayaranController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Detail pembayaran' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PembayaranController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Upload bukti transfer' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.Patch)(':id/bukti'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/bukti',
            filename: (req, file, cb) => {
                const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `bukti-${unique}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/image\/(jpg|jpeg|png)/)) {
                return cb(new Error('Hanya file JPG/PNG yang diizinkan'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], PembayaranController.prototype, "uploadBukti", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Verifikasi pembayaran (admin)' }),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_guard_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id/verifikasi'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, verifikasi_pembayaran_dto_1.VerifikasiPembayaranDto]),
    __metadata("design:returntype", void 0)
], PembayaranController.prototype, "verifikasi", null);
exports.PembayaranController = PembayaranController = __decorate([
    (0, swagger_1.ApiTags)('Pembayaran'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('pembayaran'),
    __metadata("design:paramtypes", [pembayaran_service_1.PembayaranService])
], PembayaranController);
//# sourceMappingURL=pembayaran.controller.js.map