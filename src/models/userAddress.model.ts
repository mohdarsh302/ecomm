// import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
// import { User } from './user.model';

// @Table({
//     tableName: 'UserAddresses',
// })
// export class UserAddress extends Model {
   

//     @ForeignKey(() => User)
//     @Column({
//         type: DataType.INTEGER,
//         allowNull: false,
//     })
//     userId!: number;

//     // @Column({
//     //     type: DataType.STRING,
//     //     allowNull: false,
//     // })
//     // address!: string;

//     @Column({
//         type: DataType.STRING,
//         allowNull: false,
//     })
//     address!: string;

//     @Column({
//         type: DataType.STRING,
//         allowNull: false,
//     })
//     city!: string;

//     @Column({
//         type: DataType.STRING,
//         allowNull: false,
//     })
//     country!: string;

    // @BelongsTo(() => User)
    // user?: User;

    // @BelongsTo(() => require('./user.model').User)
    // user?: any;
//}
// export default UserAddress;

import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    DataType,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model';
  
  @Table({
    tableName: 'UserAddresses',
    timestamps: true,
  })
  export class UserAddress extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    userId!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    address!: string;
  
  
    @AllowNull(false)
    @Column(DataType.STRING)
    city!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    country!: string;
    
    @BelongsTo(() => User)
    user?: User;
  }
