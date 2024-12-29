// import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
// import { Cart } from './cart.model';

// @Table({
//     tableName: 'cart_items',
//     timestamps: true,
// })
// export class CartItem extends Model {
//     @Column({
//         type: DataType.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     })
//     id!: number;

//     @ForeignKey(() => Cart)
//     @Column({
//         type: DataType.INTEGER,
//         allowNull: false,
//     })
//     cartId!: number;

//     @Column({
//         type: DataType.INTEGER,
//         allowNull: false,
//     })
//     productId!: number;

//     @Column({
//         type: DataType.INTEGER,
//         allowNull: false,
//     })
//     quantity!: number;

//     @BelongsTo(() => Cart)
//     cart?: Cart;
// }

// export default CartItem;

import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    DataType,
    ForeignKey,
    HasMany,
    BelongsTo,
} from 'sequelize-typescript';
import { Cart } from './cart.model';
import { Product } from './product.model';
  
  @Table({
    tableName: 'cart_items',
    timestamps: true,
  })
  export class CartItem extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => Cart)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    cartId!: number;

    @ForeignKey(() => Product)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    productId!: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    quantity!: number;

    @BelongsTo(() => Cart)
    cart?: Cart;

    @BelongsTo(() => Product)
    product?: Product;
    
  }
