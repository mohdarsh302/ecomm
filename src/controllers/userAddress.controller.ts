// import { Request, Response } from "express";
// import { User} from "../models/user.model";
// import { UserAddress } from "../models/userAddress.model";

// export class UserAddressController {

//     static async saveUserAddress(req: Request, res: Response): Promise<void>{
//         try {
//             const { userId, address, city, country} = req.body;
//             //const { address, city, country} = req.body;
//             //const userId = parseInt(req.params.userId, 10);
//             // const userId = 1;
//             // if (isNaN(userId)) {
//             //     res.status(400).json({ message: "Invalid userId" });
//             //     return;
//             // }
//             const user = await User.findByPk(userId);
//             if(user){
//                 await UserAddress.create({ userId, address, city, country});
//                 const user_address = await UserAddress.findAll(
//                     { 
//                         where: {userId}
//                     }
//                 );
//                 if(user_address){
//                     res.status(200).json({message: "Successfully Added Address", data:user_address });
//                 }

//             }else{
//                 res.status(404).json({message: "User not exists"});
//             }
//         } catch (error: any) {
//             res.status(500).json({message:error});
//         }
//     }

// }