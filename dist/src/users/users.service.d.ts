import { PrismaService } from '../prisma/prisma.service';
export declare class UpdateProfileDto {
    nama?: string;
    no_hp?: string;
    alamat?: string;
}
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        nama: string;
        password: string;
        no_hp: string | null;
        alamat: string | null;
        role: import(".prisma/client").$Enums.Role;
        created_at: Date;
        updated_at: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findById(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        nama: string;
        password: string;
        no_hp: string | null;
        alamat: string | null;
        role: import(".prisma/client").$Enums.Role;
        created_at: Date;
        updated_at: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    getProfile(id: number): Promise<{
        id: number;
        email: string;
        nama: string;
        no_hp: string | null;
        alamat: string | null;
        role: import(".prisma/client").$Enums.Role;
        created_at: Date;
    }>;
    updateProfile(id: number, dto: UpdateProfileDto): Promise<{
        id: number;
        email: string;
        nama: string;
        no_hp: string | null;
        alamat: string | null;
        role: import(".prisma/client").$Enums.Role;
        updated_at: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        email: string;
        nama: string;
        no_hp: string | null;
        role: import(".prisma/client").$Enums.Role;
        created_at: Date;
    }[]>;
}
