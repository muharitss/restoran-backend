"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = require("../lib/prisma");
class UserRepository {
    async findByEmail(email) {
        return prisma_1.prisma.user.findUnique({
            where: { email },
        });
    }
    // Tambahkan ini: Mencari user berdasarkan ID
    async findById(id) {
        return prisma_1.prisma.user.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return prisma_1.prisma.user.create({
            data,
        });
    }
    async findAll() {
        return prisma_1.prisma.user.findMany();
    }
    // Tambahkan ini: Menghapus user dari database
    async softDelete(id) {
        return prisma_1.prisma.user.update({
            where: { id },
            data: {
                deletedAt: new Date()
            },
        });
    }
}
exports.UserRepository = UserRepository;
