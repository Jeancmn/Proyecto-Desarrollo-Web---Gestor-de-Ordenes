import { Request, Response } from 'express';
import { Order } from '../models/Order';

export const orderController = {
  // GET /api/orders - Obtener todas las órdenes
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await Order.findAll({
        order: [['createdAt', 'DESC']],
      });
      
      const formattedOrders = orders.map(order => ({
        id: order.id,
        number: order.orderNumber,
        date: order.createdAt.toISOString(),
        orders: JSON.parse(order.items),
        tip: parseFloat(order.tip.toString()),
        total: parseFloat(order.total.toString()),
        status: order.status,
      }));

      res.json({
        success: true,
        data: formattedOrders
      });
    } catch (error) {
      console.error('Error getting orders:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving orders'
      });
    }
  },

  // POST /api/orders - Crear nueva orden
  async createOrder(req: Request, res: Response) {
    try {
      const { items, tip, subtotal, total } = req.body;
      
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Items array is required and cannot be empty'
        });
      }

      // Obtener el siguiente número de orden
      const lastOrder = await Order.findOne({
        order: [['orderNumber', 'DESC']],
      });
      
      const nextOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

      const order = await Order.create({
        orderNumber: nextOrderNumber,
        items: JSON.stringify(items),
        tip: tip || 0,
        subtotal: subtotal || 0,
        total: total || 0,
      });

      const formattedOrder = {
        id: order.id,
        number: order.orderNumber,
        date: order.createdAt.toISOString(),
        orders: JSON.parse(order.items),
        tip: parseFloat(order.tip.toString()),
        total: parseFloat(order.total.toString()),
        status: order.status,
      };

      res.status(201).json({
        success: true,
        data: formattedOrder
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating order'
      });
    }
  },

  // PUT /api/orders/:id/status - Actualizar estado de orden
  async updateOrderStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['pending', 'completed', 'cancelled'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be: pending, completed, or cancelled'
        });
      }

      const [affectedRows] = await Order.update(
        { status },
        { where: { id: parseInt(id) } }
      );

      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.json({
        success: true,
        message: 'Order status updated successfully'
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating order status'
      });
    }
  },

  // DELETE /api/orders - Eliminar todas las órdenes
  async clearAllOrders(req: Request, res: Response) {
    try {
      const deletedCount = await Order.destroy({
        where: {}
      });

      res.json({
        success: true,
        message: `${deletedCount} orders deleted successfully`
      });
    } catch (error) {
      console.error('Error clearing orders:', error);
      res.status(500).json({
        success: false,
        message: 'Error clearing orders'
      });
    }
  }
};