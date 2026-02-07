"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("../services/category.service");
const categoryService = new category_service_1.CategoryService();
class CategoryController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const category = await categoryService.createCategory(name);
            res.status(201).json({ success: true, data: category });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    async list(req, res) {
        const categories = await categoryService.getAllCategories();
        res.json({ success: true, data: categories });
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            if (typeof id !== 'string') {
                return res.status(400).json({ success: false, message: "ID tidak valid" });
            }
            const category = await categoryService.updateCategory(id, name);
            res.json({ success: true, data: category });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params; // Ambil id dengan destructuring
            if (typeof id !== 'string') {
                return res.status(400).json({ success: false, message: "ID tidak valid" });
            }
            await categoryService.deleteCategory(id);
            res.json({ success: true, message: "Kategori berhasil dihapus" });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
exports.CategoryController = CategoryController;
