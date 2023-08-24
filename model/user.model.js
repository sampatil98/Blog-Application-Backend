const mongoose=require("mongoose");

const userSchema= mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    image:{
        type:String
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

});

const UserModel= mongoose.model("User-data",userSchema);

module.exports={UserModel};