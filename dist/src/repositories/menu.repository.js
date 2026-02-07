"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuRepository = void 0;
// src/repositories/menu.repository.ts
const prisma_1 = require("../lib/prisma");
class MenuRepository {
    async create(data) {
        return prisma_1.prisma.menu.create({ data });
    }
    async findAll() {
        return prisma_1.prisma.menu.findMany({
            where: { deletedAt: null },
            include: { category: true }
        });
    }
    async findById(id) {
        return prisma_1.prisma.menu.findUnique({
            where: { id, deletedAt: null }
        });
    }
    async update(id, data) {
        return prisma_1.prisma.menu.update({
            where: { id },
            data
        });
    }
    async softDelete(id) {
        return prisma_1.prisma.menu.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
}
exports.MenuRepository = MenuRepository;
