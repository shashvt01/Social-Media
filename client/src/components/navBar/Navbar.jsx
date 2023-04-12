import "./navBar.scss";
import { Link, useNavigate,useLocation,useHistory,Navigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import Login from "../../images/login.jpeg"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useContext,useState, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import * as actionType from '../../constants/actionTypes';
import decode from "jwt-decode";
import { FormpageContext } from "../../context/formPageContext";


const Navbar = (setOpen) => {
  const [currentId, setCurrentId] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const {toggle ,darkMode} = useContext(DarkModeContext);
  const {toggleOpen ,formpage} = useContext(FormpageContext);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = currentUser?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    // setCurrentUser();
  }, [location]);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/login');
    // setCurrentUser(null);
  };

 


  return (
    <>
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none"}}>
          <span>Social App</span>
        </Link>
        <HomeOutlinedIcon style={{cursor:"pointer"}} />
        {!darkMode ? <DarkModeOutlinedIcon onClick={toggle} style={{cursor:"pointer"}}/> : <WbSunnyOutlinedIcon onClick={toggle} style={{cursor:"pointer"}}/>}
        <GridViewOutlinedIcon style={{cursor:"pointer"}}/>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search.." />
        </div>
      </div>

      <div className="right">
        <LogoutIcon onClick = {logout} style={{cursor:"pointer"}}/>
        <AddBoxOutlinedIcon onClick={toggleOpen} style={{cursor:"pointer"}} />
        <NotificationsOutlinedIcon />
        <div className="user" onClick={() => navigate(`/profile/${currentUser._id}`)}>
          <img src={currentUser?.img} alt="" />
          <span>{currentUser?.name}</span>
        </div>
      </div>

    </div>
    {/* {open && <Form setOpen={setOpen} currentId={currentId} setCurrentId={setCurrentId} />} */}
    </>
  )
}

export default Navbar
