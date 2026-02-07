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
  async updateStock(id: string, adjustment?: number, actualStock?: number) {
    const menu = await menuRepo.findById(id);
    if (!menu) throw new Error("Menu tidak ditemukan");

    // Skenario 1: Set stok secara absolut (Stok Opname)
    if (actualStock !== undefined) {
      if (actualStock < 0) throw new Error("Stok tidak boleh negatif");
      return await menuRepo.updateStock(id, actualStock, 'absolute');
    }

    // Skenario 2: Update stok secara relatif (Restock/Rusak)
    if (adjustment !== undefined) {
      if (menu.stock + adjustment < 0) {
        throw new Error(`Stok tidak cukup. Sisa stok saat ini: ${menu.stock}`);
      }
      return await menuRepo.updateStock(id, adjustment, 'relative');
    }

    throw new Error("Data update stok tidak valid");
  }

  async updateMenuStock(id: string, adjustment?: number, actualStock?: number) {
    // 1. Cek dulu apakah menu ada
    const menu = await menuRepo.findById(id);
    if (!menu) throw new Error("Menu tidak ditemukan");

    // 2. Jika user ingin set stok secara manual (misal: hasil stok opname)
    if (actualStock !== undefined) {
      if (actualStock < 0) throw new Error("Stok tidak boleh negatif");
      return await menuRepo.update(id, { stock: actualStock });
    }

    // 3. Jika user ingin tambah/kurang stok (misal: barang masuk/rusak)
    if (adjustment !== undefined) {
      const newStock = menu.stock + adjustment;
      
      if (newStock < 0) {
        throw new Error(`Stok tidak mencukupi. Stok saat ini: ${menu.stock}`);
      }
      
      return await menuRepo.update(id, { stock: newStock });
    }

    throw new Error("Data update stok tidak valid");
  }
}