const {Router}=require("express");

const {blogModel}=require("../model/blog.model");


const blogRouter=Router();

blogRouter.post("/create", async (req,res)=>{
    try {

        const data= new blogModel(req.body);
        await data.save();

        res.status(200).send({
            isError:false,
            message:"new Blog created successfully"
        })
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error
        });
    }
})

blogRouter.get("/", async (req,res)=>{
    try {

        const {search,filter,sort}=req.query;

        if(search){
            const data= await blogModel.find({ title: { $regex: search, $options: 'i' } });
           return res.status(200).send({
                isError:false,
                data:data
            })
        }
        if(filter){
            const data= await blogModel.find({ category: filter});
            return res.status(200).send({
                 isError:false,
                 data:data
             })
        }
        if(sort){
           const  order=(sort=="asc")?1:-1
            const data= await blogModel.find().sort({date:order});
           return res.status(200).send({
                isError:false,
                data:data
            })
        }
        const data= await blogModel.find();
        res.status(200).send({
            isError:false,
            data:data
        })
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        });
    }
});

blogRouter.get("/like/:id", async (req,res)=>{
    try {
        const {id}=req.params;
        const data= await blogModel.findById(id);

        data.likes+=1;
        console.log(data);
        const newdata= await blogModel.findByIdAndUpdate(id,data);
        res.status(200).send({
            isError:false,
            message:"you liked this blog",
            data:data
        })
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        });
    }
});
blogRouter.post("/coment/:id", async (req,res)=>{
    try {
        const {title,name}=req.body;
        console.log(req.body);
        const {id}=req.params;
        const data= await blogModel.findById(id);
        let comentdata={
            username:name,title:title
        }
        
        data.comments.push(comentdata)
        
        const newdata= await blogModel.findByIdAndUpdate(id,data);
        res.status(200).send({
            isError:false,
            message:"you comment on this blog",
            data:data
        })
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        });
    }
})

blogRouter.get("/myblogs", async (req,res)=>{
    try {
        const {userid}=req.body;
        console.log(userid);
        const data= await blogModel.find({userid});
        res.status(200).send({
            isError:false,
            data:data
        })
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        });
    }
})

blogRouter.delete("/myblogs/:id", async (req,res)=>{
    try {
        const {id}=req.params;
        const data= await blogModel.findByIdAndDelete(id);
        res.status(200).send({
            isError:false,
            message:"Blog deleted successfully"
        })
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        });
    }
})

blogRouter.patch("/myblogs/:id", async (req,res)=>{
    try {
        const {id}=req.params;
        const data= await blogModel.findByIdAndUpdate(id,req.body);
        res.status(200).send({
            isError:false,
            message:"Blog Updated successfully"
        })
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        });
    }
})


module.exports={blogRouter}