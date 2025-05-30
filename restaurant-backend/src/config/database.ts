import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required');
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
    
    await sequelize.sync({ force: false });
    console.log('✅ Database models synchronized');
    
  } catch (error) {
    console.error('❌ Unable to connect to database:', error);
    process.exit(1);
  }
};