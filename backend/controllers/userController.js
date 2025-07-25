const User = require("../models/userModel");


const getUserData = async (req,res)=>{
    try {
        const userID = req.userID;
        const user = await User.findById(userID);

        if(!user){
            return res.json({success: false, message: "User Not Found"});
        }
        res.json({
            success: true,
            userData : {
                name : user.name,
            }
        })
        
    } catch (error) {
        res.json({success : false, message: error.message})
    }
}

module.exports =getUserData