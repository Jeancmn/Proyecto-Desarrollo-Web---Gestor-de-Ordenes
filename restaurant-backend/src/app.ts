import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Importar rutas
import menuRoutes from './routes/menuRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tu-frontend-vercel.vercel.app'] // Cambia por tu URL de Vercel
    : ['http://localhost:5173', 'http://localhost:5174'] // Para desarrollo
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: express.Request, res: express.Response) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// API Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// 404 handler
app.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

export default app;