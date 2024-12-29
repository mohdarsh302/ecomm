import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.model';
import { UserDetails } from '../models/userDetails.model';
import { CartItem } from '../models/cartItem.model';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/orderItem.model';
const sequelize = new Sequelize({
    dialect: 'mysql', // Or 'postgres', 'sqlite', etc.
    host: 'localhost',
    username: 'root',
    password: 'Admin@123',
    database: 'ecommerce_db',
    //models: [path.join(__dirname, '../models')], // Path to your models
    //models:[User, UserAddress, UserDetails, Cart, CartItem, Category, Product]
    models:[User, UserDetails, Cart, CartItem, Product, Category, Order, OrderItem]
  });
  
  export default sequelize;