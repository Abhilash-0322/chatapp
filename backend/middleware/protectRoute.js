import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


const protectRoute = async (req, res, next) => {
    try{
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"Unauthorized -No token provided"});
        }
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        if(!verified){
            return res.status(401).json({error:"Unauthorized -Token verification failed"});
        }
    
        const user=await User.findById(verified.userId).select("-password");

        if(!user){
            return res.status(404).json({error:"User not found"});
        }

        req.user=user;
        next();
    }
    catch(error){
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

export default protectRoute;