const Medicine =  require("../models/Medicine");
const User = require("../models/User");
// const csvtojson = require("csvtojson");
// const multer  = require('multer');
// const fs  =  require('fs');




//create medicine
exports.createMedicine  =  async  (req,res)=>{
    try{
        //finding the username,name , quantity
        const userId  =  req.user.id;
        const  {
            name,quantity,
        } =  req.body;

        // console.log(name);
        // console.log(quantity);
        // console.log(username);

        //all The details would be required 
        if( !name || !quantity ){
            return res.status(400).json({
                success:false,
                message:"Please Enter The all Details",
            })
        }


        const  AdminDetails  =  await User.findById({_id:userId});
        
        console.log(AdminDetails);
        if(!AdminDetails ){
            return res.status(400).json({
                success:false,
                message:"User Not Registered",
            })
        }

        //creating the Entry into the DB
        // console.log(AdminDetails.email);
        // console.log(quantity);
        // console.log(AdminDetails.username);
        // console.log(name);
        const medicine =  await Medicine.create({
            AdminId:AdminDetails._id,
            quantity:quantity,
            name:name,
            username:AdminDetails.username,
        })

  

        //updating the User Who have created The medicine
        // console.log(medicine);
        await User.findByIdAndUpdate(
            {
				_id: AdminDetails._id,
			},
            {
                $push: {
                   medicine:medicine._id,
                }
            },
            { new: true }
        );

        return res.status(200).json({
            success:true,
            message:"Medicine Updated SuccessFully",
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error While Updating The Medicine",
        })
    }
}




//delete medicine
exports.medicineDelete = async (req,res)=>{
      try{

        const  userId  =  req.user.id;
        const  {name} = req.body;
        if(!userId){
            return  res.status(400).json({
                success:false,
                message:"UserID not Found"
            })
        }

         //finding the user 
         const  findUser  =  await User.findById({_id:userId});
         if(!findUser){
             return  res.status(400).json({
                success:false,
                message:"User Not Exists"
             })
         }
          
         if(findUser.accountType !== "Admin"){
            return res.status(400).json({
                success:false,
                message:"You can not delete This is Fo the Admin"
            })
         }

         //finding the medicine with this particular username
         const findMedicine   =  await Medicine.findOne({name:name,AdminId:userId});
         if(!findMedicine){
            return  res.status(400).json({
                success:false,
                message:"Medicine Not Exist",
            })
         }


         //before deleting the medicine update the user and delete the id of the medicine which would be created by the user 
         await User.findByIdAndUpdate(
            {_id:findUser._id},
            {
                $pull:{
                    medicine:findMedicine._id,
                }
            },
            {new:true}
         )

         //now deleting the medicine 
        await Medicine.findByIdAndDelete({_id:findMedicine._id});

        return  res.status(200).json({
            success:true,
            message:"Medicine Deleted SuccessFully",
        })

      }
      catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error While Deleting tHE Medicine"
        })
      }
}




//get all the medicine
exports.getAllMedicine  =  async (req,res)=>{
    try{
       const  medicine  =  await Medicine.find({},
                                {
                                    name:true,
                                    quantity:true,
                                    username:true,
                                    AdminId:true,
                                });

       //    console.log(medicine);
       return res.status(200).json({
        success:true,
        data:medicine
       })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error while getting alll the medicine "
        })
    }
}



//update the quantity of Medicine
exports.updateQuantityMedicine = async (req,res)=>{
    try{
         const  userid  = req.user.id;
         const  {name,quantity} = req.body;

         const user  =  await User.findById({_id:userid});
         if(!userid ||  !user || !name || !quantity){
            return res.status(400).json({
                success:false,
                message:"Error in getting The id"
            })
         }

         if(user.accountType !== "Admin"){
              return res.status(400).json({
                success:false,
                error:"Only Amin can update",
              })
         }

         const MedicineDetails  = await Medicine.findOne({name:name,username:user.username});

         if(!MedicineDetails){
            return res.status(400).json({
                success:false,
                message:"Medicine Not Found",
            })
         }
    
         const  MedicineUpdated   = await Medicine.findByIdAndUpdate({_id:MedicineDetails._id},
                                                                     {
                                                                        quantity:quantity
                                                                     },
                                                                     {new:true});

        return res.status(200).json({
            success:true,
            message:'Quantity Updated SuccessFully'
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error While Updating The Medicine"
        })
    }
}




exports.findMedicine =  async  (req,res)=>{
    try{
        //taking medicine name from the  req body 
        const  {name} =  req.body;

        //finding The data by That Particular Name 
        const  data  =  await Medicine.find({name:name});
        
        
        
        console.log(data);
        return res.status(200).json({
            success:true,
            data:data,
            message:"Finded All The Medicine with This name SuccessFully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error While Finding medicine"
        })
    }
}


