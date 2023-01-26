import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"
import postsRoutes from "./routes/posts.js"
import commentsRoutes from "./routes/comments.js"
import userRoutes from "./routes/User.js"
import dotenv from "dotenv";
import cors from'cors';
import cookieParser from "cookie-parser";
mongoose.set("strictQuery", false);


dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/posts",postsRoutes);
app.use("/api/comments",commentsRoutes);
app.use("/api/user",userRoutes);
app.use(cors());



  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    next();
  });


const connect = () =>{
    mongoose.connect(process.env.MONGO).then(() =>{
        console.log("connected to DB");
    }).catch((error) => {throw error;});
}


app.use((err , req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message,
    })
})


app.listen(8082, () => {
    connect();
    console.log("connnected");
})
