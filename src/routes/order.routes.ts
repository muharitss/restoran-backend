// src/routes/order.routes.ts
import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();
const orderController = new OrderController();

router.post('/', authenticate, orderController.create);

router.get('/', authenticate, authorize(['KASIR', 'ADMIN', 'OWNER']), orderController.list);

router.get('/:id', authenticate, orderController.detail);

router.put('/:id/cancel', authenticate, authorize(['ADMIN', 'OWNER']), orderController.cancel);

export default router;