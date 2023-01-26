import Delete from '@mui/icons-material/Delete';
import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT, COMMENTLIKE, DELETECOMMENT} from '../constants/actionTypes';

const postsReducer =   (state = {isLoading:true, posts:[]}, action) =>{
    switch(action.type){
        case 'START LOADING': 
            return {...state, isLoading:true};
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return{
                ...state,
                posts:action.payload.data,
            };
        
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        
        case FETCH_POST:
            return{
                ...state,
                post:action.payload.post
            };
        case UPDATE:

            return{...state, posts:state.posts.map((post => post._id === action.payload.id ? action.payload: post))};
        
        case DELETE:
            return{...state, posts:state.posts.filter((post) => post._id !== action.payload )};

        case LIKE:
            return{...state, posts:state.posts.map((post => post._id === action.payload._id ? action.payload: post))};
        default:
            return state;
    }
}
export default postsReducer;
