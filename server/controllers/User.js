import User from "../models/User.js"

export const getUsers = async(req,res) => {
    try{
        const users = await User.find();
        if(!users) return res.status(401).json("No user found");
        res.status(200).json({data: users});
        

    }catch(err){
        console.log(err);
    }
}

export const getUser = async(req,res) => {
    const userid = req.params.id;
    try{
        const user = await User.findById(userid);
        if(!user) return res.status(401).json("No user found");
        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
}

export const follow = async(req,res) =>{
    const userid = req.params.id;
    const currentid = req.params.userId;

    try{
        await User.findByIdAndUpdate(userid, {
            $push:{followUsers: currentid},
        });
        await User.findByIdAndUpdate(userid, {
            $inc:{followers: 1},
        });
        await User.findByIdAndUpdate(currentid,{
            $push: {followingUsers: userid},
        })
        await User.findByIdAndUpdate(currentid,{
            $inc:{following: 1}
        })

        const user = await User.findById(userid);
        const currentUser = await User.findById(currentid);

        res.status(200).json({ message:`You have started following ${user.name}` , user:user,currentUser:currentUser});
    }catch(err){
        console.log(err);
    }
}

export const unfollow = async(req,res) =>{
    const userid = req.params.id;
    const currentid = req.params.userId;

    try{
        await User.findByIdAndUpdate(userid, {
            $pull:{followUsers: currentid},
        });
        await User.findByIdAndUpdate(userid, {
            $inc:{followers: -1},
        });

        await User.findByIdAndUpdate(currentid,{
            $pull: {followingUsers: userid},
        })
        await User.findByIdAndUpdate(currentid,{
            $inc:{following: -1}
        })
        const user = await User.findById(userid);
        const currentUser = await User.findById(currentid);

        res.status(200).json({message: "You have unfollowed.", user:user,currentUser:currentUser});
    }catch(err){
        console.log(err);
    }
}