// import { Request, Response } from "express";
// import { Category } from "../models/category.model";
// import { Product } from "../models/product.model";

// export class ProductController {
//     async getAllProduct( req: Request, res: Response): Promise <void> {
//         try {
//             const products = await Product.findAll();
//             if(!products){
//                 res.status(404).json({message : "Products not found"});
//             }else{
//                 res.status(200).json({ products: products});
//             }
//         } catch (error) {
            
//         }
//     }

//     async createProduct (req: Request, res: Response): Promise <void> {
//         const { name, price, categoryId} = req.body;
//         try {
//            const product = await Product.create({ name, price, categoryId});
//            if(product){
//             res.status(201).json({ message : "Product Created Successfully", product: product});
//            }else{
//             res.status(500).json({ message : "Something went wrong"});
//            }

//         } catch (error) {
            
//         }
//     }
// }