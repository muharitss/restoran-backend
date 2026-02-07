// src/controllers/menu.controller.ts
import { Request, Response } from 'express';
import { MenuService } from '../services/menu.service';

const menuService = new MenuService();

export class MenuController {
  async create(req: Request, res: Response) {
    try {
      const menu = await menuService.createMenu(req.body);
      res.status(201).json({ success: true, data: menu });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async list(req: Request, res: Response) {
    const menus = await menuService.getAllMenus();
    res.json({ success: true, data: menus });
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (typeof id !== 'string') {
        return res.status(400).json({ success: false, message: "ID tidak valid" });
      }

      const menu = await menuService.updateMenu(id, req.body);
      res.json({ success: true, data: menu });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== 'string') {
        return res.status(400).json({ success: false, message: "ID tidak valid" });
      }

      await menuService.deleteMenu(id);
      res.json({ success: true, message: "Menu berhasil dihapus (soft delete)" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}