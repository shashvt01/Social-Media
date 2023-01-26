import mongoose, { Mongoose } from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,

    },
    title:{
        type:String,
        required:true,
    },
    creator:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    imgUrl:{
        type: String,
        default:""
    },
    videoUrl:{
        type: String,
        default:""
    },
    tags: [String],
    profilePic:String,
    likes:{
        type:[String],
        default:[]
    },
    dislikes:{
        type:[String],
        default:[]
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },

},
{timestamps : true}

)

var PostMessage = mongoose.model('posts', postSchema);

export default PostMessage;