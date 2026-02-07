// src/routes/menu.routes.ts (Update)
import { Router } from 'express';
import { MenuController } from '../controllers/menu.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();
const menuController = new MenuController();

router.get('/', menuController.list);
router.post('/', authenticate, authorize(['ADMIN', 'OWNER']), menuController.create);
router.put('/:id', authenticate, authorize(['ADMIN', 'OWNER']), menuController.update);
router.delete('/:id', authenticate, authorize(['ADMIN', 'OWNER']), menuController.delete);

export default router;  