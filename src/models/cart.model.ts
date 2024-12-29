// import { Table, Column, Model, DataType, HasMany, ForeignKey } from 'sequelize-typescript';
// import { CartItem } from './cartItem.model';
// import { User} from './user.model';

// @Table({
//     tableName: 'carts',
//     timestamps: true, // Enable if your table has `createdAt` and `updatedAt` columns
// })

// export class Cart extends Model {
//     @Column({
//       type: DataType.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//   })
//   id!: number;

//   @ForeignKey(() => User)
//     @Column({
//         type: DataType.INTEGER,
//         allowNull: false,
//     })
//     userId!: number;

//     // Has many relations
//     @HasMany(() => CartItem)
//     cartItems?: CartItem[]; // Corrected type to an array
// }
//console.log(Cart); // Add this temporarily to debug
// export default Cart;

import { CartItem } from './cartItem.model';
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
} from 'sequelize-typescript';
import { User } from './user.model';
  
  @Table({
    tableName: 'carts',
    timestamps: true,
  })
  export class Cart extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    userId!: number;

     //Has many relations
    @HasMany(() => CartItem)
    cartItems?: CartItem[]; // Corrected type to an array
  }