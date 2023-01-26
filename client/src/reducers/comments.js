import { COMMENT, DELETE_COMMENT, EDIT_COMMENT, EDIT_DELETE, FETCH_COMMENTS } from "../constants/actionTypes";

const commentsReducer = (state = {isLoading:true, comments:[]}, action) =>{
    switch(action.type){
        case 'START LOADING': 
            return {...state, isLoading:true};
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case COMMENT :
            return {...state, comments:[...state.comments, action.payload].sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)};
        case FETCH_COMMENTS:
            return {...state, comments:action.payload.data}
        case DELETE_COMMENT:
            return{...state, comments:state.comments.filter((comment) => comment._id !== action.payload)};
        
        case EDIT_COMMENT: 
            return{...state, comments:state.comments.map((comment =>  comment._id === action.payload._id ?  action.payload : comment))};

        default:
            return state;
    }
};

export default commentsReducer;
