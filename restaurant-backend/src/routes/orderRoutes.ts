import { Router, Request, Response, NextFunction } from 'express';
import { orderController } from '../controllers/orderController';

const router = Router();

// Helper to wrap async route handlers
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// GET /api/orders
router.get('/', asyncHandler(orderController.getAllOrders));

// POST /api/orders
router.post('/', asyncHandler(orderController.createOrder));

// PUT /api/orders/:id/status
router.put('/:id/status', asyncHandler(orderController.updateOrderStatus));

// DELETE /api/orders
router.delete('/', asyncHandler(orderController.clearAllOrders));

export { router as orderRoutes };
export default router;