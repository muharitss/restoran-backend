// src/services/category.service.ts
import { CategoryRepository } from '../repositories/category.repository';

const categoryRepo = new CategoryRepository();

export class CategoryService {
  async createCategory(name: string) {
    return await categoryRepo.create({ name });
  }

  async getAllCategories() {
    return await categoryRepo.findAll();
  }

  async getCategoryById(id: string) {
    const category = await categoryRepo.findById(id);
    if (!category) throw new Error("Kategori tidak ditemukan");
    return category;
  }

  async updateCategory(id: string, name: string) {
    return await categoryRepo.update(id, { name });
  }

  async deleteCategory(id: string) {
    const category = await categoryRepo.findById(id);
    if (category && category.menus.length > 0) {
      throw new Error("Kategori tidak bisa dihapus karena masih memiliki menu");
    }
    return await categoryRepo.delete(id);
  }
}