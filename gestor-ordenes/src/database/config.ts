import { Sequelize } from 'sequelize';

// Configuración para SQLite (recomendado para desarrollo)
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './restaurant.db', // Archivo de base de datos
  logging: false, // Cambiar a console.log para ver queries SQL
});

// Función para conectar a la base de datos
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente');
    
    // Sincronizar modelos (crear tablas si no existen)
    await sequelize.sync({ force: false }); // force: true elimina y recrea las tablas
    console.log('✅ Modelos sincronizados correctamente');
    
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
  }
};