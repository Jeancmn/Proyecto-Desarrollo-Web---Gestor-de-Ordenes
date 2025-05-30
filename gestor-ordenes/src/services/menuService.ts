import { MenuItem } from '../database/models/MenuItem';

export const menuService = {
  // Obtener todos los items del menú
  async getAllItems() {
    try {
      const items = await MenuItem.findAll({
        where: { available: true },
        order: [['category', 'ASC'], ['name', 'ASC']],
      });
      return items;
    } catch (error) {
      console.error('Error obteniendo items del menú:', error);
      throw error;
    }
  },

  // Crear nuevo item
  async createItem(itemData: { name: string; price: number; category?: string; description?: string }) {
    try {
      const item = await MenuItem.create(itemData);
      return item;
    } catch (error) {
      console.error('Error creando item:', error);
      throw error;
    }
  },

  // Actualizar item
  async updateItem(id: number, updates: Partial<{ name: string; price: number; category: string; available: boolean }>) {
    try {
      const [affectedRows] = await MenuItem.update(updates, {
        where: { id },
      });
      return affectedRows > 0;
    } catch (error) {
      console.error('Error actualizando item:', error);
      throw error;
    }
  },

  // Eliminar item (soft delete)
  async deleteItem(id: number) {
    try {
      const deleted = await MenuItem.update(
        { available: false },
        { where: { id } }
      );
      return deleted[0] > 0;
    } catch (error) {
      console.error('Error eliminando item:', error);
      throw error;
    }
  },
};