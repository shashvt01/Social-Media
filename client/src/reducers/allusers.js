import { FETCH_USERS, FOLLOW_USER} from "../constants/actionTypes";

const allusersReducer = (state = {allusers:[]}, action) =>{
    switch(action.type){
        case FETCH_USERS:
            return{
                ...state,
                allusers:action.payload.data,
            };
        case FOLLOW_USER:
            return{
                ...state, allusers: state.allusers.map((user) => (user._id === action.payload.user._id ? action.payload.user : user) && (user._id === action.payload.currentUser._id ? action.payload.currentUser : user))
            }

        default:
            return state;
    }
};

export default allusersReducer;
