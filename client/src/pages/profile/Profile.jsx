import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Posts from "../../components/posts/Posts"
import { fetchUser,followUser, unfollowUser } from "../../actions/user.js";
import {useLocation} from 'react-router-dom'
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";





const Profile = () => {
  const location = useLocation();
  const userid = location.pathname.substring(9,);
  // const [user,setUser] = useState();
  const dispatch = useDispatch();
  // setUser(useSelector((state) => state.user))

  useEffect(() => {
    const fetch =  async() => {
      const data = await dispatch(fetchUser(userid));
      // setUser(data);
    }
    fetch();
  }, [location])
  const user = useSelector((state) => state.requser.user);


  

  const handleFollow = async() =>{
    await dispatch(followUser(user?._id, currentUser._id))
  }

  const handleUnfollow = async() =>{
    await dispatch(unfollowUser(user?._id, currentUser._id))
  }

  
  

  const currentUser = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="profile">
      <div className="images">
        <img
          src={user?.coverimg}
          alt=""
          className="cover"
        />
        <img
          src={user?.img}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="small" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="small" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="small" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="small" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="small" />
            </a>
          </div>
          <div className="center">
            <span>{user?.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>enter link</span>
              </div>
              
            </div>
            
            <div className="item" >
                <span style={{fontSize:"14px", marginRight:"10px"}}>{user?.followers} followers</span>
                <span style={{fontSize:"14px"}}>{user?.following} following</span>
              </div>

            {userid !== currentUser._id && (user?.followUsers?.find((id) => id === currentUser._id) ? 
            <button style={{backgroundColor:"red"}} onClick={handleUnfollow}>Unfollow</button>
            :
            <button onClick={handleFollow }>Follow</button>
            
            )
            }
            
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <VideoCallIcon/>
            <MoreVertIcon />
            
          </div>
        </div>
      <Posts/>
      </div>
    </div>
  );
};

export default Profile;