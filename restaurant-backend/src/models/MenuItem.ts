import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface MenuItemAttributes {
  id?: number;
  name: string;
  price: number;
  category?: string;
  description?: string;
  available?: boolean;
}

export class MenuItem extends Model<MenuItemAttributes> implements MenuItemAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public category?: string;
  public description?: string;
  public available!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MenuItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'general',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'MenuItem',
    tableName: 'menu_items',
  }
);