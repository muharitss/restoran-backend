"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/category.routes.ts
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const categoryController = new category_controller_1.CategoryController();
router.get('/', categoryController.list);
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['ADMIN', 'OWNER']), categoryController.create);
router.put('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['ADMIN', 'OWNER']), categoryController.update);
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['ADMIN', 'OWNER']), categoryController.delete);
exports.default = router;
