const express=require("express");
const cors=require("cors");

require("dotenv").config();


const {connection}=require("./config/db");
const {userRouter}=require("./routes/user.routes");
const {blogRouter}=require("./routes/blog.routes");
const {auth}=require("./middleware/auth.moiddleware");

app=express();


app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("welcome to sambhaji's Blog-Application Backend");
});

app.use("/user",userRouter);
app.use(auth);
app.use("/blog",blogRouter);





app.listen(process.env.port, async ()=>{
    try {
        await connection;
        console.log("connected to DB");
        console.log(`server is running on port ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})