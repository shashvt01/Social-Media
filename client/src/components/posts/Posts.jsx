import "./posts.scss"
import React, {useEffect} from 'react'
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import posts from "../../reducers/posts";
import { getPosts} from "../../actions/posts";
import { fetchUsers} from "../../actions/user";

import { useLocation } from "react-router-dom";

const Posts =({setCurrentId}) => {
  const dispatch = useDispatch();
  const {posts} = useSelector((state) => state.posts);
  const location = useLocation();

  useEffect(() =>{
   dispatch(getPosts());
   dispatch(fetchUsers());
  }, [location]);

  // if(!posts.length && !isLoading) return "No posts";


  // const posts = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     userId: 1,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  
  //     desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
  //   },
  // ];
  return (
    <div className="posts">
      {posts?.map(post=>(
        <Post post={post} setCurrentId={setCurrentId} key={post._id}/>
      ))}
    </div>
  )
}

export default Posts
