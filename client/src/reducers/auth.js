import * as actionType from '../constants/actionTypes.js';

const authReducer = (state= {authData:null}, action) =>{
    switch(action.type){
        case actionType.AUTH:
            localStorage.setItem('user', JSON.stringify({...action?.payload}));
            return {...state, authData:action.data, loading:false, errors:null}

        case actionType.LOGOUT:
            localStorage.clear();
            return {...state, authData:null, loading:false, error:null};

        default:
            return state;

    }
};

export default authReducer;