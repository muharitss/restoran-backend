import { MenuRepository } from '../repositories/menu.repository';

const menuRepo = new MenuRepository();

export class MenuService {
  async createMenu(data: any) {
    return await menuRepo.create(data);
  }

  async getAllMenus() {
    return await menuRepo.findAll();
  }

  async getMenuDetail(id: string) {
    const menu = await menuRepo.findById(id);
    if (!menu) throw new Error("Menu tidak ditemukan");
    return menu;
  }

  async updateMenu(id: string, data: any) {
    return await menuRepo.update(id, data);
  }

  async deleteMenu(id: string) {
    return await menuRepo.softDelete(id);
  }

  // Poin 7: Update stok manual (Restock)
  async updateStock(id: string, newStock: number) {
    if (newStock < 0) throw new Error("Stok tidak boleh negatif");
    return await menuRepo.update(id, { stock: newStock });
  }
}