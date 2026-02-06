import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();
const userController = new UserController();

// Public Routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected Routes (Harus Login)
router.get('/me', authenticate, (req, res) => {
  res.json({ success: true, user: req.user });
});

// Admin/Owner Only Routes
router.delete('/:id', authenticate, authorize(['OWNER', 'ADMIN']), userController.delete);

export default router;