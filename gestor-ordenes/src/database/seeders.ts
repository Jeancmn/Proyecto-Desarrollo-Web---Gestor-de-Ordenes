import { MenuItem } from './models/MenuItem';
import { menuItems } from '../data/db';

export const seedDatabase = async () => {
  try {
    // Verificar si ya hay datos
    const existingItems = await MenuItem.count();
    
    if (existingItems === 0) {
      console.log('🌱 Haciendo seed de la base de datos...');
      
      // Crear items del menú
      await MenuItem.bulkCreate(
        menuItems.map(item => ({
          name: item.name,
          price: item.price,
          category: 'general',
          available: true,
        }))
      );
      
      console.log('✅ Seed completado correctamente');
    }
  } catch (error) {
    console.error('❌ Error en el seed:', error);
  }
};