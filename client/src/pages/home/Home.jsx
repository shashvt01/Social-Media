import { useContext, useEffect,useState } from "react"

import { getPosts } from "../../actions/posts"
import Form from "../../components/createPost/Form"
import Posts from "../../components/posts/Posts"
import Stories from "../../components/stories/Stories"
import { FormpageContext } from "../../context/formPageContext"
import { UpdateContext } from "../../context/UpdateContext"
import "./home.scss"

const Home = () => {
  const {formpage} = useContext(FormpageContext);
  const {updatepostId, currentId} = useContext(UpdateContext);

  return (
    <div className="home">
      <Stories/>
      <Posts setCurrentId={updatepostId}/>
    </div>
    
  )
}

export default Home
