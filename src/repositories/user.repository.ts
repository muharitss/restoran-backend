import { prisma } from '../lib/prisma';
import { Prisma, User } from '../generated/prisma';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  // Tambahkan ini: Mencari user berdasarkan ID
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  // Tambahkan ini: Menghapus user dari database
  async softDelete(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { 
        deletedAt: new Date() 
      },
    });
  }
}