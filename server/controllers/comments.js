import Comments from "../models/Comments.js"
import mongoose from "mongoose";

export const addComment = async (req,res) =>{
    const newcomment = new Comments({...req.body, createdAt: new Date().toISOString()})
    try{
        await newcomment.save();
        res.status(201).json(newcomment);
    }catch(error){
        res.status(409).json({message:error.message});

    }

}
export const getComments = async (req,res) =>{
    const {id} = req.params.postId;
    try{
        const comments = await Comments.find(id).sort({createdAt:-1})
        res.json({data:comments});

    }catch(error){
        res.status(404).json({ message: error.message });
    }

}

export const deleteComment = async (req,res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No comment with id: ${id}`);
    await Comments.findByIdAndRemove(id);
    res.json({ message: "Comment deleted successfully." });
}

export const updateComment = async (req,res) =>{
    const{id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send(`No post with id: ${id}`);
    const updatedComment = {...req.body, _id: id};
    await Comments.findByIdAndUpdate(id,updatedComment, {new:true})
    res.json(updatedComment);
}