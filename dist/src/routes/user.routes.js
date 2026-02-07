"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
// Public Routes
router.post('/register', userController.register);
router.post('/login', userController.login);
// Protected Routes (Harus Login)
router.get('/me', auth_middleware_1.authenticate, (req, res) => {
    res.json({ success: true, user: req.user });
});
// Admin/Owner Only Routes
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['OWNER', 'ADMIN']), userController.delete);
exports.default = router;
