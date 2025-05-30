import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config';

export interface OrderAttributes {
  id?: number;
  orderNumber: number;
  items: string; // JSON string de los items
  tip: number;
  subtotal: number;
  total: number;
  status?: 'pending' | 'completed' | 'cancelled';
}

export class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public orderNumber!: number;
  public items!: string;
  public tip!: number;
  public subtotal!: number;
  public total!: number;
  public status!: 'pending' | 'completed' | 'cancelled';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    items: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tip: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
  }
);