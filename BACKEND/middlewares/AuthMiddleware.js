import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

//protect route from unauthorized access

const protect = asyncHandler(async(req, res, next)=> {

        try {
            const token = req.cookies.token  //i named my cookie as "token"
            if(!token) {
                res.status(401)
                throw new Error("Not authorized, please login")
            }
            

            // verify token
             const verified  = jwt.verify(token, process.env.JWT_SECRET)

             // Get user ID from token

             const user = await User.findById(verified.id).select("-password") //all user info except password
            
             if (!user) {
                res.status(401)
                throw new Error("User not found")

             }

             //if user is found in database
             req.user = user;
             next()

        } catch (error) {
            res.status(401)
                throw new Error("Not authorized, please login")
        }
})

export default protect;