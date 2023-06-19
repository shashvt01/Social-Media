import React, { useState, useEffect, useCallback,useContext } from 'react'
import "./rightBar.scss"
import Login from "../../images/login.jpeg"
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUsers, followUser } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useRef } from 'react';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { SocketContext } from '../../context/socketContext';

const RightBar = () => {
  const {updateSocket,skt} = useContext(SocketContext);
  // console.log(updateSocket);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const allusers = useSelector((state) => state.allusers.allusers)
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = useRef();
  // const skt = useSocket();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(() => {
    
    socket.current = io("ws://localhost:8080");
    updateSocket(socket.current);
  }, [])
  // updateSocket(socket.current);

  const handleVideoCall = (e) => {
    socket.current.emit('room:join',{userid :currentUser._id, room:'123'});
  }

  

  useEffect(() => {
    dispatch(fetchUsers()); 
  },[])

  useEffect(() => {

    socket.current.emit('addUser', currentUser._id);
    socket.current.on('getUsers', users => {
      setOnlineUsers(allusers.filter(obj => {
        return users.find(element => {
          return element.userId === obj._id;
        })
      }))
    })
  }, [socket])

  const handleJoinRoom = useCallback ((data) =>{
    const {userid,room} = data;
    // console.log(userid,room);
    navigate(`/room/${room}`)
  },[])

  useEffect(() => {
    socket.current.on("room:join", handleJoinRoom); 
      return () => {
        socket.current.off('room:join', handleJoinRoom);
      }
      // console.log(`Data from backend: ${data}`);
      },[socket])

  const handleFollow = async (userid) => {
    dispatch(followUser(userid, currentUser._id))
  }


  const handleDismiss = (id) => {
    dispatch({type : 'DISMISS', payload: id});
  }

  return (
    <div className='rightBar'>
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>
          {allusers.filter(user => (user._id !== currentUser._id && !currentUser.followingUsers.includes(user._id))).slice(0, 5).map((user) => (
            <div className="user" key={user._id}>
              <div className="userInfo">
                <img src={user.img} alt="" onClick={() => navigate(`/profile/${user._id}`)} />
                <span>{user.name}</span>
              </div>
              <div className="buttons">
                <button name = "followbutton" onClick={() => handleFollow(user._id)}>follow</button>
                <button onClick={handleDismiss(user._id)}>dismiss</button>
              </div>
            </div>
          )
          )}

        </div>

        <div className="item">
          <span>Latest Activites</span>
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className='content'>
                <span>Shashwat Verma</span>
                <p>
                  changed thier cover picture
                </p>
              </div>
            </div>
            <span> 1 min ago </span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className='content'>
                <span>Shashwat Verma</span>
                <p>
                  changed thier cover picture
                </p>
              </div>
            </div>
            <span> 1 min ago </span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className='content'>
                <span>Shashwat Verma</span>
                <p>
                  changed thier cover picture
                </p>
              </div>
            </div>
            <span> 1 min ago </span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className='content'>
                <span>Shashwat Verma</span>
                <p>
                  changed thier cover picture
                </p>
              </div>
            </div>
            <span> 1 min ago </span>
          </div>
        </div>
        
        
        <div className="item">
          <span>Online Friends</span>
          {onlineUsers.filter(user => user._id!= currentUser._id &&  currentUser.followingUsers.includes(user._id)).map((user) => (
            <div className="user">
              <div className="userInfo">
                <img src={user.img} alt="" />
                <div className="online" />
                <span>{user.name}</span>
                <VideoCallIcon onClick={handleVideoCall}/>
              </div>
            </div>

          ))}
        </div>

      </div>
    </div>
  )
}

export default RightBar
