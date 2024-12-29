
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
import { Product } from './product.model';
import { Order } from './order.model';
  
  @Table({
    tableName: 'order_items',
    timestamps: true,
  })
  export class OrderItem extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @ForeignKey(() => Order)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    orderId!: number;

    @ForeignKey(() => Product)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    productId!: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    quantity!: number;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    price!: number;

    @BelongsTo(() => Product)
    product?: Product;
  }
