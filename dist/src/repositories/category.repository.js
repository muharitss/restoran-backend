"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
// src/repositories/category.repository.ts
const prisma_1 = require("../lib/prisma");
class CategoryRepository {
    async create(data) {
        return prisma_1.prisma.category.create({ data });
    }
    async findAll() {
        return prisma_1.prisma.category.findMany({
            include: {
                _count: {
                    select: { menus: true } // Memberitahu berapa banyak menu di kategori ini
                }
            },
            orderBy: { name: 'asc' }
        });
    }
    async findById(id) {
        return prisma_1.prisma.category.findUnique({
            where: { id },
            include: { menus: true }
        });
    }
    async update(id, data) {
        return prisma_1.prisma.category.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        return prisma_1.prisma.category.delete({
            where: { id }
        });
    }
}
exports.CategoryRepository = CategoryRepository;
