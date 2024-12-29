// import { Request, Response } from 'express';
// import { Category } from '../models/category.model';

// export class CategoryController {
//     async getAllCategories(req: Request, res: Response): Promise<void> {
//         const categories = await Category.findAll();
//         res.json(categories);
//     }

//     async createCategory(req: Request, res: Response): Promise<void> {
//         const { name } = req.body;
//         const category = await Category.create({ name });
//         res.json(category);
//     }

//     async getCategoryById(req: Request, res: Response):Promise<void> {
//         const {id} = req.params;
//         const category = await Category.findByPk(id);
//         if(!category){
//             res.status(404).json({message:"Category not found"});
//         }
//         res.status(200).json(category);
//     }

//     async updateCategory(req: Request, res: Response):Promise<void> {
//         try {
//             const { id } = req.params;
//             const { name } = req.body;
//             const category = await Category.findByPk(id);
//             if(!category){
//                 res.status(404).json({message:"Category not found"});
//             }else{
//                 await category.update({ name });
//                 res.status(200).json({ message: "Category updated successfully", category });
//             }
            
//         } catch (error) {
//             console.error("Error updating category:", error);
//             res.status(500).json({ message: "An error occurred while updating the category", error });
//         }

//     }

//     async deleteCategory (req: Request, res: Response) : Promise<void>{
//         const { id } = req.params;
//         try {
//             const category = await Category.findByPk(id);
//             if(!category){
//                 res.status(404).json({ message: "Category not found"});
//             }else{
//                 await category.destroy();
//                 res.status(200).json({ message: "Category deleted successfully"});
//             }
//         } catch (error) {
            
//         }
//     }
// }
