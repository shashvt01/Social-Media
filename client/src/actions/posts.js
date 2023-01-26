import * as api from "../api/index.js";
import { FETCH_ALL, START_LOADING,END_LOADING,CREATE, DELETE, UPDATE, LIKE } from "../constants/actionTypes.js";

export const getPosts = () =>async(dispatch) => {
    try{
        dispatch({type:START_LOADING});
        const {data:{data}} = await api.fetchPosts();
        dispatch({type: FETCH_ALL, payload:{data}});
        dispatch({ type: END_LOADING });

    }catch(error){
        console.log(error);
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
  // console.log(post);
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.creatingPost(post);
      dispatch({ type: CREATE, payload: data });
      dispatch({ type: END_LOADING });
  
    } catch (error) {
      console.log(error);
    }
};

export  const updatePost = (id,post) => async(dispatch) => {
  try{
    const {data} = await api.updatePost(id,post);
    dispatch({ type: UPDATE, payload: data});
    dispatch({ type: END_LOADING });


  }catch (error) {
    console.log(error);
  }
}

export const deletePost = (id) => async(dispatch) =>{
  try{
    await api.deletePost(id);
    dispatch({type:DELETE, payload: id});

  }catch(error){
    console.log(error);
  }
}

export const likePost = (postId, userId) => async(dispatch) => {
  try{
    const {data} = await api.likePost(postId,userId);
    dispatch({type: LIKE, payload: data});

  }catch(error){
    console.log(error);
  }
}
