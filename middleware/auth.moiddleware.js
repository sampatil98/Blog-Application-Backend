require("dotenv").config();
const jwt=require("jsonwebtoken");

const auth= async (req,res,next)=>{
    let token=req.headers;
    try {
        if(token){
            token=req.headers.authorization.split(" ")[1];
            let decoded = jwt.verify(token, process.env.secretkey);

            req.body={...req.body,...decoded};

            next();
        }else{
            res.status(400).send({
                isError:true,
                message:"Unauthorised"
            });
        }
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        });
    }
}

module.exports={auth};