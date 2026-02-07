"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("../services/order.service");
const order_repository_1 = require("../repositories/order.repository");
const orderService = new order_service_1.OrderService();
const orderRepo = new order_repository_1.OrderRepository();
class OrderController {
    async create(req, res) {
        try {
            const { items } = req.body; // Expecting array of { menuId, qty }
            const userId = req.user?.id; // Dari authenticate middleware
            if (!userId)
                throw new Error("User tidak teridentifikasi");
            const order = await orderService.createOrder(userId, items);
            res.status(201).json({ success: true, data: order });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    async list(req, res) {
        const orders = await orderRepo.findAll();
        res.json({ success: true, data: orders });
    }
    async detail(req, res) {
        const { id } = req.params;
        const order = await orderRepo.findById(id);
        if (!order)
            return res.status(404).json({ success: false, message: "Order tidak ditemukan" });
        res.json({ success: true, data: order });
    }
    async cancel(req, res) {
        try {
            const { id } = req.params;
            if (typeof id !== 'string') {
                return res.status(400).json({ success: false, message: "ID tidak valid" });
            }
            const cancelledOrder = await orderService.cancelOrder(id);
            res.json({
                success: true,
                message: "Order berhasil dibatalkan dan stok telah dikembalikan",
                data: cancelledOrder
            });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
exports.OrderController = OrderController;
