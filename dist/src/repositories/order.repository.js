"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const prisma_1 = require("../lib/prisma");
class OrderRepository {
    async findAll() {
        return prisma_1.prisma.order.findMany({
            include: { user: { select: { name: true } } },
            orderBy: { createdAt: 'desc' }
        });
    }
    async findById(id) {
        return prisma_1.prisma.order.findUnique({
            where: { id },
            include: {
                items: { include: { menu: true } },
                user: { select: { name: true } }
            }
        });
    }
}
exports.OrderRepository = OrderRepository;
