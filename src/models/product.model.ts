// import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
// import { Category } from './category.model';

// @Table({ tableName: 'products' })
// export class Product extends Model {
//     @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
//     id!: number;

//     @Column({ type: DataType.STRING, allowNull: false })
//     name!: string;

//     @Column({ type: DataType.TEXT, allowNull: false })
//     description!: string;

//     @Column({ type: DataType.FLOAT, allowNull: false })
//     price!: number;

//     @Column({ type: DataType.INTEGER, allowNull: false })
//     stock!: number;

//     @ForeignKey(() => Category)
//     @Column({ type: DataType.INTEGER, allowNull: false })
//     categoryId!: number;

//     @BelongsTo(() => Category)
//     category?: Category;
// }

// // export default Product;

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
    BelongsTo
} from 'sequelize-typescript';
import { Category } from './category.model';
  
  @Table({
    tableName: 'Products',
    timestamps: true,
  })
  export class Product extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    @ForeignKey(() => Category)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    categoryId!: number;
  
    @AllowNull(false)
    @Column(DataType.FLOAT)
    price!: number;

    @BelongsTo(() => Category)
    category?: Category;
      stock!: number;

    // @HasMany(() => UserAddress)
    // addresses?: UserAddress;
  }
