import mongoose from "mongoose";
import PostMessage from "../models/Post.js";

export const createPost = async(req,res)=>{
    const post = req.body;
    const newPost = new PostMessage({...post,createdAt:new Date().toISOString() })

    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(err){
        res.status(409).json({message:err.message});
    }
}

export const getPosts =async (req,res) =>{
    try{
        const posts = await PostMessage.find().sort({ _id: -1 });
        res.json({data: posts});
    }catch(err){
        res.status(404).json({ message: err.message });
    }
}

export const getPost =async (req,res) => {
    const {id} = req.params;
    try{
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    }catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const updatePost = async (req,res) =>{
    const{id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send(`No post with id: ${id}`);
    const updatedPost = {...req.body, _id:id};
    await PostMessage.findByIdAndUpdate(id,updatedPost, {new:true})
    res.json(updatedPost);
} 

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const LikePost = async(req,res) => {
    const postid = req.params.id;
    const userId = req.user.id;
    // console.log(postid, userId)

    if(!userId){
        return res.json({message: "Untathenticated"});
    }
    if(!mongoose.Types.ObjectId.isValid(postid)) return res.status(404).send(`No post with id: ${postid}`);

    const post = await PostMessage.findById(postid);
    const index = post.likes.findIndex((id)=> id===String(userId));
    // console.log(index)

    if(index === -1){
        post.likes.push(userId);
    }else{
        post.likes = post.likes.filter((postid) => postid!==String(userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(postid, post, {new: true});
    // console.log(updatedPost);
    res.status(200).json(updatedPost);
}




