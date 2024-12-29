
import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    DataType,
    HasOne,
    ForeignKey,
    BelongsTo,
    HasMany
} from 'sequelize-typescript';

import { User } from './user.model';
import { OrderItem } from './orderItem.model';
  
  @Table({
    tableName: 'orders',
    timestamps: true,
  })
  export class Order extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    userId!: number;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    totalAmount!: number;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    status!: string;
  
    @HasMany(() => OrderItem)
    orderItems?: OrderItem[];
  }
