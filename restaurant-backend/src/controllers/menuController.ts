import { Request, Response } from 'express';
import { MenuItem } from '../models/MenuItem';

// GET /api/menu - Obtener todos los items del menú
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await MenuItem.findAll({
      where: { available: true },
      order: [['category', 'ASC'], ['name', 'ASC']],
    });
    
    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    console.error('Error getting menu items:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving menu items'
    });
  }
};

// POST /api/menu - Crear nuevo item
export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, price, category, description } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name and price are required'
      });
    }

    const item = await MenuItem.create({
      name,
      price,
      category,
      description
    });

    res.status(201).json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating menu item'
    });
  }
};

// PUT /api/menu/:id - Actualizar item
export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [affectedRows] = await MenuItem.update(updates, {
      where: { id: parseInt(id) }
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    const updatedItem = await MenuItem.findByPk(id);
    
    res.json({
      success: true,
      data: updatedItem
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating menu item'
    });
  }
};

// DELETE /api/menu/:id - Eliminar item (soft delete)
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await MenuItem.update(
      { available: false },
      { where: { id: parseInt(id) } }
    );

    if (deleted[0] === 0) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting menu item'
    });
  }
};