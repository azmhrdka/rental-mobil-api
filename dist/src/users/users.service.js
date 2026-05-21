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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = exports.UpdateProfileDto = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
class UpdateProfileDto {
    nama;
    no_hp;
    alamat;
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "nama", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "no_hp", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "alamat", void 0);
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    findById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async getProfile(id) {
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
        if (!user)
            throw new common_1.NotFoundException('User tidak ditemukan');
        return user;
    }
    async updateProfile(id, dto) {
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map