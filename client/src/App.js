import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/navBar/Navbar';
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rightBar/RightBar';
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import './style.scss'
import { useContext, useState } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';
import Form from './components/createPost/Form';
import { FormpageContext } from './context/formPageContext';
import { UpdateContext } from './context/UpdateContext';
import Room from './pages/Room/Room';


 
function App() {

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const {darkMode} = useContext(DarkModeContext);
  const {formpage} = useContext(FormpageContext);
  const [open, setOpen] = useState(false);
  const {updatepostId, currentId} = useContext(UpdateContext);

  const Layout = () =>{
    return(
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style = {{display:"flex"}}>
          <LeftBar/>
          <div style={{flex:6}}>
          <Outlet/>
          </div>
          
          <RightBar/>
        </div>
      </div>
    )
  };

  const ProtectedRoute = ({children}) =>{
    if(currentUser == null){
      return <Navigate to="/login"/>
    }

    return children;
  }

  const router = createBrowserRouter([
    {
      path:"/",
      element:(
      <ProtectedRoute>
        <Layout/>
      </ProtectedRoute>
      ),
      children:[
        {
          path:"/",
          element: formpage? <Form currentId={currentId} setCurrentId={updatepostId}/> :<Home/>
        },
        {
          path:"/profile/:id",
          element:<Profile/>
        },
      ]
    },
    {
      path:'/room/:roomId',
      element:<Room/>
    },
    {
      path: "/login",
      element: <Login />,
      
    },
    {
      path:"/register",
      element:<Register/>
    },
    

  ]);
  return (
    <div className="App">
      {/* <Login/> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
