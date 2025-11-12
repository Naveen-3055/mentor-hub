import generateToken from "../config/genToken.js";
import User from "../models/user.model.js";
import { createUser } from "../utils/auth.service.js";
import bcrypt from "bcryptjs";

export const SignUp= async (req,res)=>{
    try {
        const {userName,email,password} = req.body;
        const checkByUserName = await User.findOne({userName});
        if(checkByUserName){
            return res.status(400).json({message:'user already exist'})
        }
        const checkByEmail = await User.findOne({email})
        if(checkByEmail){
            return res.status(400).json({message:`email already Exist`})

        }
        if(password.length<6){
              return res.status(400).json({message:"password should contains more than 6 characters"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const user = await createUser(userName,email,hashPassword);

        const token = await generateToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"Strict",
            secure:false

        })

        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({message:`signUp error ${error.message}`})
       }
}

export const Login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:`user not exists`})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
           return res.status(400).json({message:`incorrect password`});
       }
        const token = await generateToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"Strict",
            secure:false
        })
        return res.status(201).json(user);
    } catch (error) {
         return res.status(500).json({message:`login error ${error}`})
    }
}

 export const logout= async (req,res)=>{
        try {
            res.clearCookie("token");
            res.status(200).json({message:`logout succesfully...`})
        } catch (error) {
            return res.status(500).json({message:`login error ${error}`})
        }
}

export const googleLogin = async (req,res)=>{
    try {
        let {name,email} = req.body;
        let user = await User.findOne({email})
        if(!user){
            user = await User.create({
                name,email
            })
        }
        let token = await generateToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge:7*24*60*60*1000
        })
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({message:`google login error ${error}`}) 
    }
}