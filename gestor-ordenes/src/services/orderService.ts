import { Order } from '../database/models/Order';
import { OrderItem } from '../types';

export const orderService = {
  // Obtener todas las órdenes
  async getAllOrders() {
    try {
      const orders = await Order.findAll({
        order: [['createdAt', 'DESC']],
      });
      
      return orders.map(order => ({
        id: order.id,
        number: order.orderNumber,
        date: order.createdAt.toISOString(),
        orders: JSON.parse(order.items),
        tip: order.tip,
        total: order.total,
        status: order.status,
      }));
    } catch (error) {
      console.error('Error obteniendo órdenes:', error);
      throw error;
    }
  },

  // Crear nueva orden
  async createOrder(orderData: {
    items: OrderItem[];
    tip: number;
    subtotal: number;
    total: number;
  }) {
    try {
      // Obtener el siguiente número de orden
      const lastOrder = await Order.findOne({
        order: [['orderNumber', 'DESC']],
      });
      
      const nextOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

      const order = await Order.create({
        orderNumber: nextOrderNumber,
        items: JSON.stringify(orderData.items),
        tip: orderData.tip,
        subtotal: orderData.subtotal,
        total: orderData.total,
      });

      return {
        id: order.id,
        number: order.orderNumber,
        date: order.createdAt.toISOString(),
        orders: JSON.parse(order.items),
        tip: order.tip,
        total: order.total,
        status: order.status,
      };
    } catch (error) {
      console.error('Error creando orden:', error);
      throw error;
    }
  },

  // Actualizar estado de orden
  async updateOrderStatus(id: number, status: 'pending' | 'completed' | 'cancelled') {
    try {
      const [affectedRows] = await Order.update(
        { status },
        { where: { id } }
      );
      return affectedRows > 0;
    } catch (error) {
      console.error('Error actualizando estado de orden:', error);
      throw error;
    }
  },

  // Eliminar todas las órdenes
  async clearAllOrders() {
    try {
      const deletedCount = await Order.destroy({
        where: {},
      });
      return deletedCount;
    } catch (error) {
      console.error('Error eliminando órdenes:', error);
      throw error;
    }
  },
};