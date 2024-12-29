// import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
// import { Product } from './product.model';

// @Table({ tableName: 'categories' })
// export class Category extends Model {
//     @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
//     id!: number;

//     @Column({ type: DataType.STRING, allowNull: false, unique: true })
//     name!: string;

//     @HasMany(() => Product)
//     products?: Product[];
// }
// // export default Category;
import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    DataType,
    HasMany,
} from 'sequelize-typescript';
// import { Product } from './product.model';

  
  @Table({
    tableName: 'Categories',
    timestamps: true,
  })
  export class Category extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    // @HasMany(() => Product)
    // products?: Product;
  }
