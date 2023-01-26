import React from 'react'
import { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "./comments.scss"
import {AuthContext} from "../../context/authContext";
import {useDispatch, useSelector} from "react-redux"
import { useState } from 'react';
import { addComment, deleteComment, deleteComments, editComment, fetchComments } from '../../actions/comments';
import { useEffect } from 'react';
import moment from 'moment';



const Comments = ({post, user}) => {
    const {currentUser} = useContext(AuthContext);

    const [editId,setEditId] = useState('');
    const dispatch = useDispatch();
    const [commentData, setCommentData]  = useState('');
    const [comment,setComment] = useState({desc : '' , postId:post._id, userId:user._id, creator:user.name, profilePic:user.img});
    const {comments} = useSelector((state) => state.comments);
    // console.log(comments);
    // const comments = morecomments.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)

    // dispatch(fetchComments(post._id));

    useEffect(() => {
      dispatch(fetchComments(post._id));
    }, [])

      const handleComment = () =>{
          if(editId === ''){
          // e.preventDefault();
          setCommentData('');
          dispatch(addComment(post._id, comment));
        }
        else{
          dispatch(editComment(editId, comment));
          setEditId('');
          setCommentData('');
        }
        // await dispatch(fetchComments(post._id));

      }
    

  return (
    <div className="comments">
        <div className="write">
            <img src={currentUser.img} alt="" />
            <input type="text" placeholder='write a comment' value={commentData} onChange={(e) => {setCommentData(e.target.value); setComment({...comment, desc:e.target.value})}} />
            <button onClick = {() => handleComment()}>Send</button>
        </div>
      {comments?.map(comment=>(
        (comment.postId === post._id) && 
        <div className="comment" key ={comment._id}>
            <img src={comment.profilePic} alt="" />
            <div className="info">
                <span>{comment.creator}</span>
                <span className='date'>{moment(comment.createdAt).fromNow()}</span>

                <p>{comment.desc}</p>
            </div>
            {comment.userId === user?._id && <EditIcon style={{color:"blue", cursor:"pointer"}} onClick={() => {setCommentData(comment.desc); setEditId(comment._id)}}/>}
            {comment.userId === user?._id && <DeleteIcon style={{color:"red", cursor:"pointer"}} onClick={() => dispatch(deleteComment(comment._id))}/>}
        </div>
      ))}
    </div>
  )
}

export default Comments
