// src/repositories/menu.repository.ts
import { prisma } from '../lib/prisma';
import { Menu, Prisma } from '../generated/prisma';

export class MenuRepository {
  async create(data: Prisma.MenuCreateInput): Promise<Menu> {
    return prisma.menu.create({ data });
  }

  async findAll(): Promise<Menu[]> {
    return prisma.menu.findMany({
      where: { deletedAt: null },
      include: { category: true }
    });
  }

  async findById(id: string): Promise<Menu | null> {
    return prisma.menu.findUnique({
      where: { id, deletedAt: null }
    });
  }

  async update(id: string, data: Prisma.MenuUpdateInput): Promise<Menu> {
    return prisma.menu.update({
      where: { id },
      data
    });
  }

  async softDelete(id: string): Promise<Menu> {
    return prisma.menu.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }

  async updateStock(id: string, amount: number, mode: 'relative' | 'absolute'): Promise<Menu> {
    return prisma.menu.update({
      where: { id },
      data: {
        stock: mode === 'relative' 
          ? { increment: amount } 
          : amount                
      }
    });
  }
}