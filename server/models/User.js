import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        requires:true,
    },
    email:{
        type:String,
        require:true,
        uniqe:true
    },
    coverimg:{
        type:String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShh8lXLuQ-Ou-4i8MEV1TXtUV_hRdPRG18Bq4BerY1yA&s",
    },
    img:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    password:{
        type:String,
    },
    followers:{
        type:Number,
        default:0,
    },
    followUsers:{
        type:[String],
    },
    following: {
        type:Number,
        default:0,
    },
    followingUsers:{
        type:[String],
    },
    fromGoogle:{
        type:Boolean,
        default:false
    },
    isOnline:{
        type : Boolean,
        default:true
    }

},
{timestamps : true}
);

export default mongoose.model("Users", UserSchema);