import userModel from "../models/auth.model.js";
import { verifyAccessToken } from "../utilis/auth.utili.js";

export const authenticate = async (req,res,next)=>{
    try {
        const accessToken = req.headers.authorization.split(" ")[1]
    
        if(!accessToken){
            return res.status(401).json({
                message: "Access Token does not exists"
            })
        }
            const {id} = verifyAccessToken(accessToken);
            const user = await userModel.findById(id)

            req.user = user

            next()
        } catch (error) {
            res.status(401).json({
                message: "Invalid or expired access Token",
                errors: error.message
        })
       }
}