import * as api from "../api/index.js";
import { FETCH_USER, FETCH_USERS, FOLLOW,UNFOLLOW,AUTH, FOLLOW_USER } from "../constants/actionTypes.js";


export const fetchUser =(id) =>async(dispatch) =>  {
    try{
        const user = await api.fetchUser(id);
        dispatch({type:FETCH_USER, payload:user.data});
        // return user.data;

    }catch(err){
        console.log(err);
    }
}
export const fetchUsers = () =>async(dispatch) =>  {
    try{
        const {data: {data}} = await api.fetchUsers();
        dispatch({type:FETCH_USERS, payload:{data}});
        // return users.data;

    }catch(err){
        console.log(err);
    }
}

export const followUser = (id, current) => async(dispatch) => {
    try{
        const { data } = await api.follow(id,current);
        dispatch({type: FOLLOW, payload: data.user});
        dispatch({type: AUTH, payload: data.currentUser});
        dispatch({type:FOLLOW_USER, payload:{user:data.user, currentUser:data.currentUser}});


    }catch(err){
        console.log(err);
    }
}

export const unfollowUser = (id, current) => async(dispatch) => {
    try{
        const { data } = await api.unfollow(id,current);
        dispatch({type: UNFOLLOW, payload: data.user});
        dispatch({type: AUTH, payload: data.currentUser});
        dispatch({type:FOLLOW_USER, payload:{user:data.user, currentUser:data.currentUser}});

    }catch(err){
        console.log(err);
    }
}