"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const menu_repository_1 = require("../repositories/menu.repository");
const menuRepo = new menu_repository_1.MenuRepository();
class MenuService {
    async createMenu(data) {
        return await menuRepo.create(data);
    }
    async getAllMenus() {
        return await menuRepo.findAll();
    }
    async getMenuDetail(id) {
        const menu = await menuRepo.findById(id);
        if (!menu)
            throw new Error("Menu tidak ditemukan");
        return menu;
    }
    async updateMenu(id, data) {
        return await menuRepo.update(id, data);
    }
    async deleteMenu(id) {
        return await menuRepo.softDelete(id);
    }
    // Poin 7: Update stok manual (Restock)
    async updateStock(id, newStock) {
        if (newStock < 0)
            throw new Error("Stok tidak boleh negatif");
        return await menuRepo.update(id, { stock: newStock });
    }
}
exports.MenuService = MenuService;
