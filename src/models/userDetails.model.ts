// import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
// import { User } from './user.model';
// console.log(User);

// @Table({
//     tableName: 'UserDetails',
// })
// export class UserDetails extends Model {

    

//     @ForeignKey(() => User)

//     @Column({
//         type: DataType.INTEGER,
//         allowNull: false,
//     })
//     userId!: number;

//     @Column({
//         type: DataType.STRING,
//         allowNull: false,
//     })
//     phone!: string;

//     @Column({
//         type: DataType.DATE,
//         allowNull: false,
//     })
//     dob!: Date;

//     // @BelongsTo(() => User)
//     // user?: User;

//     // @BelongsTo(() => require('./user.model').User)
//     // user?: any;
// }
// //console.log(UserDetails); // Add this temporarily to debug
// // export default UserDetails;

import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    DataType,
  HasOne,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model';
  
  @Table({
    tableName: 'UserDetails',
    timestamps: true,
  })
  export class UserDetails extends Model {
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
    phone!: string;
  
  
    @AllowNull(false)
    @Column(DataType.DATE)
    dob!: Date;

    
    
    @BelongsTo(() => User)
    user?: User;
  }

