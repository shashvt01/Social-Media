import * as api from "../api/index.js";
import { AUTH } from "../constants/actionTypes.js";

export const signin = (formData, navigate) => async(dispatch) => {
    try{
        const {data} = await api.signIn(formData);
        dispatch({type:AUTH, payload:data});
        navigate('/');
    }catch(err){
        console.log(err);
    }
}; 

export const googleSignin = (formData, navigate) => async(dispatch) => {
    try{
        const {data} = await api.signInWithGoogle(formData);
        dispatch({type:AUTH, payload:data});
        navigate('/');
    }catch(err){
        console.log(err);
    }
}; 


export const signup = (formData, navigate) => async(dispatch) => {
    try{

        const {data} = await api.signUp(formData);
        dispatch({type:AUTH, payload:data});
        navigate('/');
    }catch(err){
        console.log(err);
    }
};

