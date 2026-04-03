import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import { generateToken } from "../middleware/generateToken.js";

export const signUp = async (req,res) =>{
    try {
        let{fullname, email , password} = req.body;
        if(!fullname || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        let user= await userModel.findOne({email:email});
        if(user) {
            return res.status(409).json({message:"User already exists"})
        }
        bcrypt.genSalt(10 , function (err,salt) {
            bcrypt.hash(password,salt, async function (err,hash){
                if(err) {
                    return res.status(401).json({message:err.message})
                }
                
                let user = await userModel.create({
                    fullname,
                    password:hash,
                    email,
                })
                let token = generateToken(user);
                res.cookie("token", token, { httpOnly: true });
                return res.status(201).json({message:"Successful the user has been created"})
            })
        })
    
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const login = async(req,res) =>{
    try {
        let { email , password} = req.body;
        let user  = await userModel.findOne({email: email})
        if(!user){
            return res.status(404).json({message:"User does not exist"})
        }
        bcrypt.compare(password,user.password ,function(err,result){
            if(result){
                let token = generateToken(user);
                res.cookie("token", token, { httpOnly: true });
                return res.status(200).json({message:"Logged in successfully"})
            }if(err){
                return res.status(404).json({message:"Invalid email or pass"})
            }
        })
    } catch (error) {
        return res.status(501).json({message:error.message})
    }
};

export async function logout(req , res) {
    res.cookie("token", "", { expires: new Date(0) });
    return res.json({message: "Logged out successfully."});
};

export async function wishlistAdd(req,res) {
    try {
        const userId= req.user.id;
        const {productId} = req.body;
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ message: "Already in wishlist" });
        }
        user.wishlist.push(productId);
        await user.save();
        return res.json({
            message:"Added to wishlist",
            wishlist: user.wishlist
        });

    } catch (error) {
        return res.status(500).json({ message:error.message });
    }
};

export async function wishlistRemove(req,res) {
    try {
        const userId= req.user.id;
        const {productId} = req.body;
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).message({message:"User not found"})
        }
        user.wishlist = user.wishlist.filter(
            id=> id.toString() !== productId
        );
        await user.save();
        return res.json({
            message: "Removed from wishlist",
            wishlist: user.wishlist
        })

        
    } catch (error) {
        return res.status(500).json({ message:error.message });
    }
}
