import User from "../models/User.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


export const signup =  async(req,res) =>{
    const { email, password, name } = req.body;

    try{
        const oldUser = await User.findOne({ email });
        if (oldUser) return res.status(400).json({ message: "User already exists" });

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({name:req.body.name, ...req.body, password: hash});

        await newUser.save();
        const token = jwt.sign({id:newUser._id}, process.env.JWT)
        console.log(token);
        const {password, ...others} = newUser._doc
        res.cookie("access_token",token,{
            httpOnly: true
        }).status(200).json(others);
    }
    catch(err){
        console.log(err);
    }
};

export const signin = async(req,res) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user) return res.status(404).json({ message: "User doesn't exist" });
        

        const isCorrect =await bcrypt.compare(req.body?.password, user.password)
        if(!isCorrect) return res.status(400).json({ message: "Invalid credentials" });


        const token = jwt.sign({id:user._id}, process.env.JWT)
        const {password, ...others} = user._doc;
        res.cookie("access_token",token,{
            httpOnly: true,
        }).status(200).json(others);
        
    }
    catch(err){
        console.log(err);
    }
}

export const googleAuth = async (req,res) =>{
    
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            const token = jwt.sign({id:user._id}, process.env.JWT)
            res.cookie("access_token",token,{
                httpOnly: true,
            }).status(200).json(user._doc);
        }
        else{
            const newUser = new User({
                name:req.body.name,
                ...req.body,
                fromGoogle:true
            })
            const savedUser = await newUser.save();
            const token = jwt.sign({id:savedUser._id}, process.env.JWT)
            res.cookie("access_token", token,{
                httpOnly:true
            }).status(200).json(savedUser._doc);
        }
    }catch{

    }
}