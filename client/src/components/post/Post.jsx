import React, { useContext } from 'react'
import './post.scss'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from '@mui/material';
import Comments from '../comments/Comments';
import { useState } from 'react';
import moment from 'moment';
import { FormpageContext } from '../../context/formPageContext';
import { deletePost, likePost } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import { blue } from '@mui/material/colors';
import { useNavigate, useNavigation } from 'react-router-dom';


const Post = ({ post, setCurrentId }) => {

    const [commentOpen, setCommentOpen] = useState(false);
    const [options, setOptions] = useState(false);
    const { toggleOpen, formpage } = useContext(FormpageContext);
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem('user')); 
    const {comments} = useSelector((state) => state.comments);
    const [likes, setLikes] = useState(post?.likes);
    const userId = currentUser._id;
    const navigate = useNavigate();

    const hasLikedPost = post?.likes.find((like) => like === userId);

    const handleLike = async () => {
    dispatch(likePost(post._id, userId));

    if (hasLikedPost) {
      setLikes(post?.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }

  };

  const Likes = () => {
    if (likes?.length > 0) {
      return likes?.find((like) => like === userId)
        ? (
          <><FavoriteOutlinedIcon style={{color:"red"}} fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><FavoriteBorderOutlinedIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><FavoriteBorderOutlinedIcon fontSize="small" />&nbsp;Like</>;
  };

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post?.profilePic} alt="" style={{cursor:"pointer"}} onClick={() => navigate(`/profile/${post.userId}`)}/>
                        <div className="details">
                            <Link to={`/profile/${post?.userId}`} style={{ cursor:"pointer", textDecoration: "none", color: "inherit" }}>
                                <span className='name'>{post?.creator}</span>
                            </Link>
                            <span className='date'> {moment(post?.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    {(post?.userId === currentUser._id) &&
                        <div className="dropdown" >
                            <div className="btn " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <MoreHorizIcon style={{ cursor: "pointer" }} />
                            </div>
                            <div className="dropdown-menu " style={{transform: "translate3d(-95px, 40px, 0px)" }} aria-labelledby="dropdownMenuButton">
                                <button className='dropdown-item' style={{ cursor: "pointer",border:"none",color:"blue", padding:"5px 10px"}}  ><EditIcon
                                    onClick={(e) => {
                                        setCurrentId(post?._id);
                                        e.stopPropagation();
                                        toggleOpen()
                                    }}
                                    size="small"
                                />Edit Post</button>
                                <button className='dropdown-item' style={{color:"red", cursor: "pointer", border:"none",padding:"5px 10px", width:"10px" }} onClick={() => dispatch(deletePost(post._id))} ><DeleteIcon/>Delete Post</button>
                            </div>
                        </div> 
                    }
                </div>
                <div className="content">
                    <h3>{post?.title}</h3>
                    {(post?.videoUrl === "") ?
                        <img src={post?.imgUrl} alt="" />
                        :
                        <video src={post?.videoUrl} controls></video>
                    }
                    <p >{post?.desc}</p>

                </div>
                <div className="info">
                    <div className="item">
                        <div style={{cursor:"pointer" }} name = "likebutton"  disabled={!currentUser} onClick={handleLike} >
                            <Likes  />
                        </div>
                        
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        {comments.filter(comment => comment.postId===post?._id).length} comments
                        
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {commentOpen && <Comments post={post} user={currentUser} />}
            </div>
        </div>
    )
}

export default Post
