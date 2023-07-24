const  jwt  =  require("jsonwebtoken");
require("dotenv").config();
const  User  =  require("../models/User");


//auth
exports.auth =  async (req,res,next)=>{
    try{
        
        //extract token
        const  token =  req.cookies.token 
                        || req.body.token 
                        || req.header("Authentication").replace("Bearer ","");

        //if token missing then return response 
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Not Found",
            })
        }

        //verify The token
        try{
            const  decode   =   jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user =  decode;
        }
        catch(error){
             return res.status(401).json({
                success:false,
                message:"Token is Invalid",
             })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token",
         })
    }
}

exports.isCustomer =  async (req,res,next)=>{
    try{
        console.log("")
        if(req.user.accountType !== "Customer"){
            return res.status(401).json({
                success:false,
                message:'This is The Protected Route for Customers Only'
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role can Not BE Verified Please Try Again'
        })
    }
}


// isAdmin

exports.isAdmin  =  async (req,res,next)=>{
    try{
         console.log("Printing The AccountType",req.user.accountType);
         if(req.user.accountType!== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for the Admin Only "
            })
         }
         next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role can Not Be Verified ,Please Try Again Later ',
        })
    }
}