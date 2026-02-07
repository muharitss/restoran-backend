// src/controllers/order.controller.ts
import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { OrderRepository } from '../repositories/order.repository';

const orderService = new OrderService();
const orderRepo = new OrderRepository();

export class OrderController {
  async create(req: Request, res: Response) {
    try {
      const { items } = req.body; // Expecting array of { menuId, qty }
      const userId = req.user?.id; // Dari authenticate middleware

      if (!userId) throw new Error("User tidak teridentifikasi");

      const order = await orderService.createOrder(userId, items);
      res.status(201).json({ success: true, data: order });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async list(req: Request, res: Response) {
    const orders = await orderRepo.findAll();
    res.json({ success: true, data: orders });
  }

  async detail(req: Request, res: Response) {
    const { id } = req.params;
    const order = await orderRepo.findById(id as string);
    if (!order) return res.status(404).json({ success: false, message: "Order tidak ditemukan" });
    res.json({ success: true, data: order });
  }

  async cancel(req: Request, res: Response) {
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
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
  }
}