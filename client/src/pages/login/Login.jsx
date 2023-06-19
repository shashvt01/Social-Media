import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import { googleSignin, signin } from '../../actions/auth';
import {auth,provider} from "../../firebase.js"
import {signInWithPopup} from 'firebase/auth'
import { AUTH } from "../../constants/actionTypes.js";
import axios from "axios";




const initialState = {email:'' , password:'', img:''};

const  Login = () => {
  const {login} = useContext(AuthContext);
  const [form,setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(signin(form,navigate));
    navigate('/');
  };

  const handleChange = (e) => setForm({...form, [e.target.name] : e.target.value});

  const signInWithGoogle = async() =>{
    await signInWithPopup(auth,provider).then((result)=>{
      axios.post("/auth/google",{
        name:result.user.displayName,
        email:result.user.email,
        img:result.user.photoURL,
      }).then((res)=>{
        const data = res.data;
        console.log(data);
        dispatch({type:AUTH, payload:data});
        navigate('/');
      })
    
  });
  }


  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello world.</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur earum praesentium, obcaecati illo error ab tempore eos esse sint, ducimus quod iste cum quam dignissimos molestiae dolor totam fugit porro</p>
          <span> Don't have an account ?</span>
          <Link to="/register" >
          <button>Register</button>
          </Link>
        </div>
        
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" id="emial" name="email"  onChange={handleChange}/>
            <input type="password" placeholder="Password" id="password" name="password" onChange={handleChange}/>
            <button name="login" type="submit">Login</button> 
            </form>

            or
            <button name = "loginwithGoogle" type="submit" onClick={signInWithGoogle}>Login with Google</button>

        </div>
      </div>
    </div>
  )
}

export default Login;

