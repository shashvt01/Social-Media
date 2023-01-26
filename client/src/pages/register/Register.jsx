import { Link,useNavigate } from "react-router-dom"
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';


import "./register.scss"
import { signup } from "../../actions/auth";

const initialState = { name:'', email: '', password: '' };

const  Register = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(signup(form,navigate));
  }

  const handleChange = (e) => setForm({...form, [e.target.name] : e.target.value});

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social App</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur earum praesentium, obcaecati illo error ab tempore eos esse sint, ducimus quod iste cum quam dignissimos molestiae dolor totam fugit porro</p>
          <span> Already have an account ?</span>
          <Link to="/login" >
            <button>Login</button>
          </Link>
        </div>
        
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Userame" name ="name" onChange={handleChange}/>
            <input type="text" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
