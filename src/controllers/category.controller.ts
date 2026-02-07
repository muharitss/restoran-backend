// src/controllers/category.controller.ts
import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

const categoryService = new CategoryService();

export class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const category = await categoryService.createCategory(name);
      res.status(201).json({ success: true, data: category });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async list(req: Request, res: Response) {
    const categories = await categoryService.getAllCategories();
    res.json({ success: true, data: categories });
  }

  async update(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (typeof id !== 'string') {
        return res.status(400).json({ success: false, message: "ID tidak valid" });
        }

        const category = await categoryService.updateCategory(id, name);
        res.json({ success: true, data: category });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
    }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params; // Ambil id dengan destructuring

      if (typeof id !== 'string') {
        return res.status(400).json({ success: false, message: "ID tidak valid" });
      }

      await categoryService.deleteCategory(id);
      res.json({ success: true, message: "Kategori berhasil dihapus" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}