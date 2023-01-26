import React, { useState,useEffect } from 'react'
import "./rightBar.scss"
import Login from "../../images/login.jpeg"
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUsers, followUser } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';


const RightBar = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const allusers = useSelector((state)=> state.allusers.allusers)
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  const handleFollow = async(userid) =>{
    await dispatch(followUser(userid, currentUser._id))
  }
  

  return (
    <div className='rightBar'>
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>
          {allusers?.filter(user => (user._id !== currentUser._id &&  !currentUser.followingUsers.includes(user._id))).slice(0,2).map((user) => (
              <div className="user" key = {user._id}>
              <div className="userInfo">
                <img src={user.img} alt=""  onClick={() => navigate(`/profile/${user._id}`)} />
                <span>{user.name}</span>
              </div>
              <div className="buttons">
                <button onClick={() => handleFollow(user._id)}>follow</button>
                <button>dismiss</button>
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
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className="online" />
              <span>Shashwat Verma</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className="online" />
              <span>Shashwat Verma</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className="online" />
              <span>Shashwat Verma</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className="online" />
              <span>Shashwat Verma</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className="online" />
              <span>Shashwat Verma</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className="online" />
              <span>Shashwat Verma</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Login} alt="" />
              <div className="online" />
              <span>Shashwat Verma</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default RightBar
