import { UsersService, UpdateProfileDto } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        id: number;
        email: string;
        nama: string;
        no_hp: string | null;
        alamat: string | null;
        role: import(".prisma/client").$Enums.Role;
        created_at: Date;
    }>;
    updateProfile(req: any, dto: UpdateProfileDto): Promise<{
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
    findOne(id: number): Promise<{
        id: number;
        email: string;
        nama: string;
        no_hp: string | null;
        alamat: string | null;
        role: import(".prisma/client").$Enums.Role;
        created_at: Date;
    }>;
}
