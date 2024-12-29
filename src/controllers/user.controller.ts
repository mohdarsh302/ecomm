import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserDetails } from "../models/userDetails.model";
import { UserAddress } from "../models/userAddress.model";

const JWT_SECRET = 'your_jwt_secret';
//import { Server as SocketIOServer } from 'socket.io';
//import http from 'http';


export class UserController {
    // constructor(private readonly userModel:User){
        
    // }
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.findAll();
            if(!users){
                res.status(404).json({message:"Users not found"});
            }else{
                res.status(200).json({message:"Users list", users:users});
            }
        } catch (error) {
            
        }
    }

    async registerUser (req: Request, res: Response) : Promise<void> {
        try {
            const { name, email, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({name, email, password:hashedPassword});
            if(user){
               // Emit `newUser` event to all connected clients
                // const io = (req as any).io; // Access `io` from the request object
                // io.emit('newUser', {
                //     id: user.id,
                //     name: user.name,
                //     email: user.email,
                // });
                res.status(201).json({message:"Successfully Registered", user:user});
            }else{
                res.status(500).json({message:"Something went wrong"});

            }

        } catch (error) {
            
        }
    }

    async getUser (req: Request, res: Response) : Promise<void> {
        try {
            console.log("sdfghjkl");
            const { id } = req.params;
            //const { name } = req.body;
            const user = await User.findByPk(id);
            if(!user){
                res.status(404).json({message:"User not found"}); 
            }else{
                res.status(200).json({message:"Successfully", user:user});
            }
        } catch (error: any) {
            res.status(500).json({message:error});
        }
    }

    // async userLogin (req: Request, res: Response): Promise<void> {
    //     console.log("hiiiiii");
    //     try {
    //         console.log("hiiiiii");
    //         const { email, password} = req.body;
    //         if (!email || !password) {
    //             res.status(400).json({ error: 'Email and password are required.' });
    //         }
    //         // find user
    //         const user = await User.findOne({ where: { email}});
    //         if(!user){
    //             res.status(404).json({ message: "User not found"});
    //             return;
    //         }else{
    //             // Validate password
    //             const isPasswordValid = await bcrypt.compare(password, user.password);
    //             if (!isPasswordValid) {
    //                 res.status(401).json({ error: 'Invalid credentials.' });
    //                 return;
    //             }
    //             const token = jwt.sign(
    //                 { id: user.id, email: user.email }, // Payload
    //                 JWT_SECRET, // Secret key
    //                 { expiresIn: '1h' } // Token expiration
    //             );
    //             res.status(200).json({
    //                 message: 'Login successful.',
    //                 token, // Return the token
    //                 data: user
    //             });
    //         }
            
    //     } catch (error: any) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }

    async userLogin(req: Request, res: Response): Promise<void> {
        console.log('hieeee');
        try {
          const { email, password } = req.body;
    
          if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required.' });
            return; // Terminate further execution
          }
    
          // Find user by email
          const user = await User.findOne({ where: { email } });
    
          if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return; // Terminate further execution
          }
    
          // Validate password
          const isPasswordValid = await bcrypt.compare(password, user.password);
    
          if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials.' });
            return; // Terminate further execution
          }
    
          // Generate JWT token
          const token = jwt.sign(
            { id: user.id, email: user.email }, // Payload
            JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Token expiration
          );
    
          // Respond with token and user data
          res.status(200).json({
            message: 'Login successful.',
            token, // Return the token
            data: user,
          });
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
    }

    async userProfile(req: Request, res: Response): Promise<void>{
        try {
            const user = (req as any).user;
            const id = user.id;
            // const userDetails = await User.findOne({
            //     where: { id},
            //     include:[
            //         {
            //             model: UserDetails,
            //             include:[
            //                 {
            //                     model: UserAddress
            //                 }
            //             ]
            //         }
            //     ]
            // });
            const userData = await User.findOne({
                where: { id },
                attributes: ['id', 'name', 'email'],
            });
            const userDetails = await UserDetails.findOne({
                where: { userId: id },
                attributes: ['phone', 'dob'],
            });
            const userAddress = await UserAddress.findOne({
                where: { userId: id },
                attributes: ['address', 'city', 'country'],
            });
            if(!userData){
                res.status(404).json({message: "Not found"});
            }else{
                res.status(200).json({ message: "User details", user: userData, details: userDetails, address: userAddress});
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }



    // Create a new user

    
}