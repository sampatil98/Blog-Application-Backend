const mongoose=require("mongoose");

const blogSchema= mongoose.Schema({
    userid:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    likes:{
        type:Number,
        default:0
        
    },
    comments:[{
        username:{
            type:String,
        },
        title:{
            type:String,
        }
    }]
        
    

});

const blogModel= mongoose.model("Blog-data",blogSchema);

module.exports={blogModel};