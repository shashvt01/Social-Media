import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    profilePic: {
        type:String,
        default:""
    },
    creator:String,
    postId:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    createdAt:{
        type: Date,
        default: new Date(),
    }

},
{timestamps : true}
);

var Comments =  mongoose.model("Comments", commentsSchema);

export default Comments;