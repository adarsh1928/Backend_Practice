const mongoose=require("mongoose")

exports.Forms=async (req,res)=>{

      const {title,email,accountType,semester,fields,submissions}=req.body;

      if(!email  || !title ){
        res.status(400).json({
            message:"all field required",
            success:false
        })
      }

    //   if(accountType==="Instructor")






}