import { prisma } from '../lib/prisma';

export class OrderRepository {
  async findAll() {
    return prisma.order.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { menu: true } },
        user: { select: { name: true } }
      }
    });
  }
}