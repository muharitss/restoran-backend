// src/repositories/category.repository.ts
import { prisma } from '../lib/prisma';
import { Category, Menu, Prisma } from '../generated/prisma';

export type CategoryWithMenus = Category & { menus: Menu[] };

export class CategoryRepository {
  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return prisma.category.create({ data });
  }

  async findAll(): Promise<Category[]> {
    return prisma.category.findMany({
      include: {
        _count: {
          select: { menus: true } // Memberitahu berapa banyak menu di kategori ini
        }
      },
      orderBy: { name: 'asc' }
    });
  }

  async findById(id: string): Promise<CategoryWithMenus | null> {
    return prisma.category.findUnique({
      where: { id },
      include: { menus: true }
    }) as Promise<CategoryWithMenus | null>;
  }

  async update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<Category> {
    return prisma.category.delete({
      where: { id }
    });
  }
}