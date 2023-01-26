import * as api from "../api/index.js";
import { COMMENT,START_LOADING, END_LOADING, FETCH_ALL, FETCH_COMMENTS, DELETE_COMMENT, EDIT_COMMENT } from "../constants/actionTypes.js";

export const addComment = (id,newcomment) => async (dispatch) => {
    try {
        // console.log(newcomment)
        const { data } = await api.commentPost(id,newcomment);
        dispatch({type:COMMENT, payload:data})

    } catch (error) {
        console.log(error);
    }

};

export const fetchComments = (id) => async(dispatch) => {

    try{
        // dispatch({ type: START_LOADING });
        const {data:{data}} = await api.fetchComments(id);
        dispatch({type:FETCH_COMMENTS, payload:{data}})
        // dispatch({ type: END_LOADING })
    }catch (error) {
        console.log(error);
    }
}

export const deleteComment = (id) => async (dispatch) => {
    try{
        await api.deleteComment(id);
        dispatch({type:DELETE_COMMENT, payload: id});
    }catch (error) {
        console.log(error);
    }
}


export const editComment = (id,comment) => async(dispatch) => {
    try{
      const {data} = await api.editComment(id,comment);
      dispatch({ type: EDIT_COMMENT, payload: data});
    }catch (error) {
      console.log(error);
    }
  }
  