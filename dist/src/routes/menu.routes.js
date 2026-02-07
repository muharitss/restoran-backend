"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/menu.routes.ts (Update)
const express_1 = require("express");
const menu_controller_1 = require("../controllers/menu.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const menuController = new menu_controller_1.MenuController();
router.get('/', auth_middleware_1.authenticate, menuController.list);
// Proteksi CRUD Menu
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['ADMIN', 'OWNER']), menuController.create);
router.put('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['ADMIN', 'OWNER']), menuController.update);
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['ADMIN', 'OWNER']), menuController.delete);
exports.default = router;
