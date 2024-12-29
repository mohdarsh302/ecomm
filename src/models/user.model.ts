// import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript';
// import { UserDetails } from './userDetails.model';
// import { UserAddress } from './userAddress.model';
// // import { Order } from '../order/order.model';

// @Table({ tableName: 'users' })
// export class User extends Model {
//     @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
//     id!: number;

//     @Column({ type: DataType.STRING, allowNull: false })
//     name!: string;

//     @Column({ type: DataType.STRING, allowNull: false, unique: true })
//     email!: string;

//     @Column({ type: DataType.STRING, allowNull: false })
//     password!: string;

//     // @HasOne(() => UserDetails)
//     // details?: UserDetails;

//     // @HasMany(() => UserAddress)
//     // addresses?: UserAddress;

//     // @HasMany(() => Order)
//     // orders?: Order[];
// }
// // export default User;


import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    DataType,
  HasOne,
} from 'sequelize-typescript';
import { UserDetails } from './userDetails.model';
  
  @Table({
    tableName: 'users',
    timestamps: true,
  })
  export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;
  
    @AllowNull(false)
    @Column({
      type: DataType.STRING,
      unique: true,
    })
    email!: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string;

    @HasOne(() => UserDetails)
    details?: UserDetails;

    // @HasMany(() => UserAddress)
    // addresses?: UserAddress;
  }