"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const menu_service_1 = require("../services/menu.service");
const menuService = new menu_service_1.MenuService();
class MenuController {
    async create(req, res) {
        try {
            const menu = await menuService.createMenu(req.body);
            res.status(201).json({ success: true, data: menu });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    async list(req, res) {
        const menus = await menuService.getAllMenus();
        res.json({ success: true, data: menus });
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            if (typeof id !== 'string') {
                return res.status(400).json({ success: false, message: "ID tidak valid" });
            }
            const menu = await menuService.updateMenu(id, req.body);
            res.json({ success: true, data: menu });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            if (typeof id !== 'string') {
                return res.status(400).json({ success: false, message: "ID tidak valid" });
            }
            await menuService.deleteMenu(id);
            res.json({ success: true, message: "Menu berhasil dihapus (soft delete)" });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
exports.MenuController = MenuController;
