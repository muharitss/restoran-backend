// src/routes/category.routes.ts
import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();
const categoryController = new CategoryController();

router.get('/', authenticate, categoryController.list);

router.post('/', authenticate, authorize(['ADMIN', 'OWNER']), categoryController.create);
router.put('/:id', authenticate, authorize(['ADMIN', 'OWNER']), categoryController.update);
router.delete('/:id', authenticate, authorize(['ADMIN', 'OWNER']), categoryController.delete);

export default router;