import { FETCH_USER, FOLLOW,UNFOLLOW } from "../constants/actionTypes";

const userReducer = (state = {isLoading:true, user:{}}, action) =>{
    switch(action.type){
        case 'START LOADING': 
            return {...state, isLoading:true};
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case FOLLOW:
            return {...state, user: action.payload};
        case UNFOLLOW:
            return {...state, user: action.payload};
        case FETCH_USER:
            return {...state, user: action.payload};
        default:
            return state;
    }
};

export default userReducer;
