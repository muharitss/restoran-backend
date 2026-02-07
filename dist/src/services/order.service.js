"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const prisma_1 = require("../lib/prisma");
class OrderService {
    async createOrder(userId, items) {
        // Memulai Transaksi
        return await prisma_1.prisma.$transaction(async (tx) => {
            let totalAmount = 0;
            const orderItemsData = [];
            for (const item of items) {
                // 1. Cek ketersediaan menu & stok
                const menu = await tx.menu.findUnique({
                    where: { id: item.menuId }
                });
                if (!menu || menu.deletedAt) {
                    throw new Error(`Menu dengan ID ${item.menuId} tidak ditemukan`);
                }
                if (menu.stock < item.qty) {
                    throw new Error(`Stok untuk ${menu.name} tidak mencukupi (Tersedia: ${menu.stock})`);
                }
                // 2. Hitung total harga
                const subtotal = menu.price * item.qty;
                totalAmount += subtotal;
                // 3. Kurangi stok menu (Poin 7)
                await tx.menu.update({
                    where: { id: menu.id },
                    data: { stock: { decrement: item.qty } }
                });
                // 4. Siapkan data item
                orderItemsData.push({
                    menuId: menu.id,
                    qty: item.qty,
                    price: menu.price // Simpan harga saat transaksi (snapshot)
                });
            }
            // 5. Buat Order (Poin 5 & 6)
            const order = await tx.order.create({
                data: {
                    orderNumber: `ORD-${Date.now()}`, // Simple generator
                    totalAmount,
                    userId,
                    status: 'PAID', // Default lunas
                    items: {
                        create: orderItemsData
                    }
                },
                include: { items: true }
            });
            return order;
        });
    }
    async cancelOrder(orderId) {
        return await prisma_1.prisma.$transaction(async (tx) => {
            // 1. Cari order beserta itemnya
            const order = await tx.order.findUnique({
                where: { id: orderId },
                include: { items: true }
            });
            if (!order)
                throw new Error("Order tidak ditemukan");
            if (order.status === 'CANCELLED')
                throw new Error("Order sudah dibatalkan sebelumnya");
            // 2. Kembalikan stok untuk setiap item (Poin 7 & 11)
            for (const item of order.items) {
                await tx.menu.update({
                    where: { id: item.menuId },
                    data: { stock: { increment: item.qty } } // Menambah kembali stok
                });
            }
            // 3. Update status order menjadi CANCELLED
            const updatedOrder = await tx.order.update({
                where: { id: orderId },
                data: { status: 'CANCELLED' }
            });
            return updatedOrder;
        });
    }
}
exports.OrderService = OrderService;
