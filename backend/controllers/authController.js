const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const register = async (req,res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({success : false, message: "Missing Details"});
    }

    try {

        const existingUser = await User.findOne({email })

        if(existingUser){
            return res.json({success : false, message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        })
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        // sending token to users in the response in the cookie. 
        // res.cookie = res.send
        res.cookie("token", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",

            // We have to change this when we deploy
            sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({success : true})


    } catch (error) {
        res.json({success : false, message: error.message})
    }

}


const login = async (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({success : false, message: "Email and Password are required"});
    }
    try {

        const user = await User.findOne({email});

        if(!user){
            return res.json({success : false, message: "Invalid email"});
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({success : false, message: "Wrong password"});
        }


        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        // sending token to users in the response in the cookie. 
        // res.cookie = res.send
        res.cookie("token", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",

            // We have to change this when we deploy
            sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

         return res.json({success : true})
        
    } catch (error) {
        return res.json({success : false, message: error.message})
    }
}

const logout = async (req,res)=>{
    try {
        res.clearCookie("token", {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",

            // We have to change this when we deploy
            sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
            
        } )

        return res.json({success: true, message : "Logged Out"})

    } catch (error) {
        return res.json({success : false, message: error.message})
    }
}




module.exports = {register, login, logout}