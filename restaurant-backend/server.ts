import app from './src/app';
import { connectDB } from './src/config/database';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Conectar a la base de datos
    await connectDB();
    
    // Seed inicial (opcional)
    await seedInitialData();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Función para datos iniciales
async function seedInitialData() {
  try {
    const { MenuItem } = await import('./src/models');
    
    const existingItems = await MenuItem.count();
    
    if (existingItems === 0) {
      console.log('🌱 Seeding initial menu data...');
      
      const initialMenuItems = [
        { name: 'Perro Caliente Sencillo', price: 7, category: 'hot-dogs' },
        { name: 'Perro Caliente Especial', price: 10, category: 'hot-dogs' },
        { name: 'Hamburguesa Sencilla', price: 12, category: 'hamburgers' },
        { name: 'Hamburguesa Doble', price: 18, category: 'hamburgers' },
        { name: 'Gaseosa', price: 3, category: 'drinks' },
        { name: 'Jugo Natural', price: 5, category: 'drinks' },
      ];
      
      await MenuItem.bulkCreate(initialMenuItems);
      console.log('✅ Initial data seeded successfully');
    }
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

startServer();