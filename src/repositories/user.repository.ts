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

  // Tambahkan ini: Menghapus user dari database
  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}