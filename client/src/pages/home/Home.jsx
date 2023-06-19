import { useContext, useEffect,useState } from "react"

import { getPosts } from "../../actions/posts"
import Form from "../../components/createPost/Form"
import Posts from "../../components/posts/Posts"
import Stories from "../../components/stories/Stories"
import { FormpageContext } from "../../context/formPageContext"
import { UpdateContext } from "../../context/UpdateContext"
import "./home.scss"
import { WebcamCapture } from "../Webcam/Webcam"

const Home = () => {
  const {formpage} = useContext(FormpageContext);
  const currentUser = JSON.parse(localStorage.getItem('user')); 
  const {updatepostId, currentId} = useContext(UpdateContext);


  return (
    <div className="home">
      <Stories/>
      {/* <WebcamCapture/> */}
      <Posts setCurrentId={updatepostId}/>
    </div>
    
  )
}

export default Home
