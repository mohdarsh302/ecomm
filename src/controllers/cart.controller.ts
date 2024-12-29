import { Request, Response } from 'express';
import {Cart} from '../models/cart.model';
import {CartItem} from '../models/cartItem.model';
//import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import sequelize from '../config/db'; // Adjust the import path as necessary
import { OrderItem } from '../models/orderItem.model'; // Add this import
import { Order } from '../models/order.model'; // Import the Order model
const JWT_SECRET = 'your_jwt_secret';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_jxu7ucK3inpVGMIbv8sWQ3MW00oxDhhrVP', {
    apiVersion: '2024-12-18.acacia',
  });

export class CartController {
    async addToCart (req: Request, res: Response): Promise<void>{
        try {
            //const { userId, productId, quantity } = req.body;
            const { productId, quantity } = req.body;
            const user = (req as any).user;
            const userId = user.id;
            //console.log('user===>' + user);
            //const userId = user.id;
            // Find or create a cart for the user
            const [cart] = await Cart.findOrCreate({
                where: { userId },
            });

            // Check if the product already exists in the cart
            const cartItem = await CartItem.findOne({
                where: { cartId: cart.id, productId },
            });

            if (cartItem) {
                // Update quantity if the product exists
                cartItem.quantity += quantity;
                await cartItem.save();
              } else {
                // Add the product to the cart
                await CartItem.create({
                  cartId: cart.id,
                  productId,
                  quantity,
                });
              }
          
              res.status(200).json({ message: 'Product added to cart successfully' });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async removeCartItem ( req: Request, res: Response) : Promise<void> {
        try {
            const { productId} = req.body;
            const user = (req as any).user;
            const userId = user.id;

            // find cart
            const cart = await Cart.findOne({
                where: { userId}
            });
            if(!cart){
              res.status(404).json({ message: 'Cart not found' });
            }else{
                // find catt Item
                const cartItem = await CartItem.findOne({
                    where:{ cartId: cart.id, productId }
                });
                if (!cartItem) {
                    res.status(404).json({ error: 'Product not found in cart' });
                }else{
                    await cartItem.destroy();
                    // check cart length
                    const checkcartItem = await CartItem.findOne({
                        where: { cartId: cart.id}
                    });
                    if(checkcartItem){
                        res.status(200).json({ message: 'Product deleted from cart' });
                    }else{
                        await  cart.destroy();
                        res.status(200).json({ message: 'Cart is empty' });
                    }
                }
            }

            
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCartItem (req: Request, res: Response) : Promise<void> {
        try {
            //const { userId, productId, quantity} = req.body;
            const { productId, quantity } = req.body;
            const user = (req as any).user;
            const userId = user.id;
            // check cart
            const cart = await Cart.findOne({
                where : { userId}
            });
            if(!cart){
                res.status(404).json({ message: 'Cart not found' });  
            }else{
                // check Cart Item
                const cartItem = await CartItem.findOne({
                    where: {
                        cartId:cart.id, productId
                    }
                });
                if(!cartItem){
                    await CartItem.create({ cartId: cart.id, productId, quantity});
                }else{
                    await cartItem.update({quantity});
                }
                res.status(200).json({message: "cart updated successfully"});
            }
            
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async cartDetails (req: Request, res: Response): Promise<void> {
        try {
            const  user  = (req as any ).user;
            const userId = user.id;
            // check cart
            const cart = await Cart.findOne({
                where:{ userId}
            });
            if(cart){
                const cartDetails = await CartItem.findAll({
                    where: { cartId: cart.id},
                    include:[
                        {
                            model: Product,
                            include:[ {
                                model: Category,
                                attributes: ['name'],
                            }],
                            attributes: ['name', 'price'],
                        }
                    ],
                    
                });
                if (cartDetails.length > 0) {
                    const formattedResponse = cartDetails.map((item) => ({
                        cartId: item.cartId,
                        name: item.product?.name,
                        categoryName: item.product?.category?.name || 'Unknown', // If category is missing, fallback to 'Unknown'
                        price: item.product?.price || 0,
                        quantity: item.quantity,
                        total: (item.product?.price || 0) * item.quantity,
                      }));
                    res.status(200).json({ message: "your cart details", data: formattedResponse});
                }else{
                    res.status(200).json({ message: "your cart is empty"});
                }
            }else{
                res.status(404).json({ message: "your cart not found"});
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message});
            
        }
    }

    async checkoutCart(req: Request, res: Response): Promise<void> {
        const transaction = await sequelize.transaction();
        try {
            const user = (req as any).user; // Assuming user is authenticated and added to the request object
            const userId = user.id;
        
            // Find the cart for the user
            const cart = await Cart.findOne({ where: { userId } });
            if (!cart) {
              res.status(404).json({ message: 'Cart not found' });
              return;
            }
        
            // Fetch cart details with product information
            const cartItems = await CartItem.findAll({
              where: { cartId: cart.id },
              include: [Product],
            });
        
            if (cartItems.length === 0) {
              res.status(400).json({ message: 'Cart is empty' });
              return;
            }
        
            // Calculate total price and prepare order items
            let totalPrice = 0;
            const orderItems = [];
            for (const item of cartItems) {
              const product = item.product;
              if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
              }
        
              if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for product: ${product.name}`);
              }
        
              // Deduct stock
              product.stock -= item.quantity;
              await product.save({ transaction });
        
              // Calculate total price
              totalPrice += item.quantity * product.price;
        
              // Prepare order item data
              orderItems.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price,
              });
            }
        
            // Create the order
            const order = await Order.create(
              {
                userId,
                totalAmount: totalPrice,
                status: 'pending', // Default status
              },
              { transaction }
            );
        
            // Create order items
            for (const orderItem of orderItems) {
              await OrderItem.create(
                {
                  orderId: order.id,
                  productId: orderItem.productId,
                  quantity: orderItem.quantity,
                  price: orderItem.price,
                },
                { transaction }
              );
            }
        
            // Clear the cart
            //await CartItem.destroy({ where: { cartId: cart.id }, transaction });
        
            // Commit transaction
            await transaction.commit();

            // Create Stripe PaymentIntent
            // const paymentIntent = await stripe.paymentIntents.create({
            //     amount: Math.round(totalPrice * 100), // Amount in cents
            //     currency: 'usd',
            //     metadata: { orderId: order.id.toString() },
            //     // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            //     automatic_payment_methods: {
            //         enabled: true,
            //     },
            // });

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'product 1'
                            },
                            unit_amount: 100 * 100
                        },
                        quantity: 1
                    },
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'product 2'
                            },
                            unit_amount: 150 * 100
                        },
                        quantity: 2
                    } ,
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'product 3'
                            },
                            unit_amount: 200 * 100
                        },
                        quantity: 2
                    },
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'product 4'
                            },
                            unit_amount: 200 * 100
                        },
                        quantity: 2
                    }           
                ],
                mode: 'payment',
                // shipping_address_collection: {
                //     allowed_countries: ['US', 'BR']
                // },
                // success_url: `http://localhost:4003/api/cart/complete?session_id={CHECKOUT_SESSION_ID}`,
                // cancel_url: `http://localhost:4003/api/cart/cancel`
                success_url: `http://localhost:4003`,
                cancel_url: `http://localhost:4003`
                
            })
            console.log(session);
            if (session.url) {
                res.redirect(session.url);
            } else {
                res.status(500).json({ error: 'Failed to create Stripe session' });
            }
        
            // res.status(200).json({
            //     message: 'Checkout successful, redirect to Stripe',
            //     clientSecret: paymentIntent.client_secret,
            //     orderId: order.id,
            //   data: {
            //     orderId: order.id,
            //     totalAmount: totalPrice,
            //   },
            // });
          } catch (error: any) {
            // Rollback transaction in case of error
            await transaction.rollback();
            res.status(500).json({ error: error.message });
          }
    }

    async updateStatus(req: Request, res: Response): Promise<void>{
        console.log(req.body);
    }
}
