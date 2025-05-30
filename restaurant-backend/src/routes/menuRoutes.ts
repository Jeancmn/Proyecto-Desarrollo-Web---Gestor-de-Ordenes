import { Router, Request, Response, NextFunction } from 'express';
import { createItem, deleteItem, getAllItems, updateItem } from '../controllers/menuController';

const router = Router();

// Helper to wrap async route handlers and catch errors
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// GET /api/menu
router.get('/', asyncHandler(getAllItems));

// POST /api/menu
router.post('/', asyncHandler(createItem));

// PUT /api/menu/:id
router.put('/:id', asyncHandler(updateItem));

// DELETE /api/menu/:id
router.delete('/:id', asyncHandler(deleteItem));

export default router;