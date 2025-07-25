const jwt = require("jsonwebtoken");

const userAuth = async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.json({success : false, message : "Not authorised" })
    }

    try {

        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecoded.id){
            req.userID = tokenDecoded.id;
        }
        else{
            return res.json({success : false, message : "Not authorised" })
        }

        next();
        
    } catch (error) {
        res.json({success : false, message :error.message})
    }
}


module.exports = userAuth;