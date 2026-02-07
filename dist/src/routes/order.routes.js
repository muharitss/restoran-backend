"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/order.routes.ts
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const orderController = new order_controller_1.OrderController();
router.post('/', auth_middleware_1.authenticate, orderController.create);
router.get('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['KASIR', 'ADMIN', 'OWNER']), orderController.list);
router.get('/:id', auth_middleware_1.authenticate, orderController.detail);
router.put('/:id/cancel', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['ADMIN', 'OWNER']), orderController.cancel);
exports.default = router;
