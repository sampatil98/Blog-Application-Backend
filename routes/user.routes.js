const {Router}=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


const {UserModel}=require("../model/user.model");

const userRouter=Router();

userRouter.post("/register", async (req,res)=>{
    try {
        const {email,password}=req.body;

        // applied dummy image for each user
        const image="https://spng.pngfind.com/pngs/s/173-1737582_1000-x-972-71-4-business-man-with.png"

        const ispresent= await UserModel.findOne({email});

        if(ispresent){
            res.status(400).send({
                isError:true,
                message:"User already present please login"
            });
        }

        bcrypt.hash(password, 10, async function(err, hash) {
            if(hash){
                const user= new UserModel({...req.body,password:hash,image:image});
                await user.save();
                res.status(200).send({
                    isError:false,
                    message:"Account created successfully"
                })
            }else{
                res.status(500).send({
                    isError:true,
                    message:"internal server error"
                });
            }
        });
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        });
    }
})

// userRouter.post("/register", async (req,res)=>{
//     try {

//         res.status(200).send({
//             isError:false,
//             message:""
//         })
        
//     } catch (error) {
//         res.status(400).send({
//             isError:true,
//             message:error.message
//         });
//     }
// })

userRouter.post("/login", async (req,res)=>{
    try {

        const {email,password}=req.body;

        const user= await UserModel.findOne({email});

        if(!user){
          return  res.status(400).send({
                isError:true,
                message:"Wrong E-mail id"
            });
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                const token= jwt.sign({userid:user._id,username:user.name},process.env.secretkey);

                res.status(200).send({
                    isError:false,
                    message:"User Logged in Successfully",
                    token:token
                });

            }else{
                res.status(400).send({
                    isError:true,
                    message:"Wrong Password"
                }); 
            }
        });

        
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        });
    }
})


module.exports={userRouter};