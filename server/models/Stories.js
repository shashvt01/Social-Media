import mongoose, { Mongoose } from "mongoose";

const storiesSchema = new mongoose.Schema({



    },
    {timestamps : true}
);

var stories = mongoose.model('stories', storiesSchema);

export default stories;
