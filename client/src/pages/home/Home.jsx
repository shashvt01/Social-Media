import { useContext, useEffect,useState } from "react"

import { getPosts } from "../../actions/posts"
import Form from "../../components/createPost/Form"
import Posts from "../../components/posts/Posts"
import Stories from "../../components/stories/Stories"
import { FormpageContext } from "../../context/formPageContext"
import { UpdateContext } from "../../context/UpdateContext"
import "./home.scss"
import io from 'socket.io-client';

const Home = () => {
  const {formpage} = useContext(FormpageContext);
  const {updatepostId, currentId} = useContext(UpdateContext);


  var socket = io('http://localhost:8082');
            socket.on('greeting-from-server', function (message) {
                document.body.appendChild(
                    document.createTextNode(message.greeting)
                );
                console.log("connected")
                socket.emit('greeting-from-client', {
                    greeting: 'Hello Server'
                });
            });
 

  return (
    <div className="home">
      <Stories/>
      <Posts setCurrentId={updatepostId}/>
    </div>
    
  )
}

export default Home
