"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
// src/services/category.service.ts
const category_repository_1 = require("../repositories/category.repository");
const categoryRepo = new category_repository_1.CategoryRepository();
class CategoryService {
    async createCategory(name) {
        return await categoryRepo.create({ name });
    }
    async getAllCategories() {
        return await categoryRepo.findAll();
    }
    async getCategoryById(id) {
        const category = await categoryRepo.findById(id);
        if (!category)
            throw new Error("Kategori tidak ditemukan");
        return category;
    }
    async updateCategory(id, name) {
        return await categoryRepo.update(id, { name });
    }
    async deleteCategory(id) {
        const category = await categoryRepo.findById(id);
        if (category && category.menus.length > 0) {
            throw new Error("Kategori tidak bisa dihapus karena masih memiliki menu");
        }
        return await categoryRepo.delete(id);
    }
}
exports.CategoryService = CategoryService;
