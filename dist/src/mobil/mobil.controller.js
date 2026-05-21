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
exports.MobilController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
const mobil_service_1 = require("./mobil.service");
const create_mobil_dto_1 = require("./dto/create-mobil.dto");
const update_mobil_dto_1 = require("./dto/update-mobil.dto");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const roles_guard_1 = require("../auth/guard/roles.guard");
let MobilController = class MobilController {
    mobilService;
    constructor(mobilService) {
        this.mobilService = mobilService;
    }
    findAll(query) {
        return this.mobilService.findAll(query);
    }
    findTersedia(query) {
        return this.mobilService.findTersedia(query);
    }
    cekKetersediaan(id, tanggal_mulai, tanggal_selesai) {
        return this.mobilService.cekKetersediaan(id, tanggal_mulai, tanggal_selesai);
    }
    findOne(id) {
        return this.mobilService.findOne(id);
    }
    create(dto) {
        return this.mobilService.create(dto);
    }
    update(id, dto) {
        return this.mobilService.update(id, dto);
    }
    remove(id) {
        return this.mobilService.remove(id);
    }
    uploadFoto(id, file) {
        return this.mobilService.uploadFoto(id, file.filename);
    }
};
exports.MobilController = MobilController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Ambil semua mobil' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'transmisi', required: false, enum: ['MANUAL', 'OTOMATIS'] }),
    (0, swagger_1.ApiQuery)({ name: 'kapasitas', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'harga_min', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'harga_max', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MobilController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Ambil mobil tersedia' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'transmisi', required: false, enum: ['MANUAL', 'OTOMATIS'] }),
    (0, swagger_1.ApiQuery)({ name: 'kapasitas', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'harga_min', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'harga_max', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    (0, common_1.Get)('tersedia'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MobilController.prototype, "findTersedia", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cek ketersediaan mobil by tanggal' }),
    (0, swagger_1.ApiQuery)({ name: 'tanggal_mulai', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'tanggal_selesai', required: true }),
    (0, common_1.Get)(':id/cek-ketersediaan'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('tanggal_mulai')),
    __param(2, (0, common_1.Query)('tanggal_selesai')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], MobilController.prototype, "cekKetersediaan", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Ambil detail mobil' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MobilController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tambah mobil (admin)' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, roles_guard_1.Roles)('ADMIN'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mobil_dto_1.CreateMobilDto]),
    __metadata("design:returntype", void 0)
], MobilController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update mobil (admin)' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, roles_guard_1.Roles)('ADMIN'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_mobil_dto_1.UpdateMobilDto]),
    __metadata("design:returntype", void 0)
], MobilController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus mobil (admin)' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, roles_guard_1.Roles)('ADMIN'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MobilController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Upload foto mobil (admin)' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, roles_guard_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id/foto'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('foto', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/mobil',
            filename: (req, file, cb) => {
                const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `mobil-${unique}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/image\/(jpg|jpeg|png|webp)/)) {
                return cb(new Error('Hanya file JPG/PNG/WEBP yang diizinkan'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], MobilController.prototype, "uploadFoto", null);
exports.MobilController = MobilController = __decorate([
    (0, swagger_1.ApiTags)('Mobil'),
    (0, common_1.Controller)('mobil'),
    __metadata("design:paramtypes", [mobil_service_1.MobilService])
], MobilController);
//# sourceMappingURL=mobil.controller.js.map