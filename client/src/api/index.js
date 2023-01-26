import axios from 'axios';
const API = axios.create();



API.interceptors.request.use((req) =>{
    if(localStorage.getItem('user') !== null) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
    }
    return req;
});

export const fetchPosts = () => API.get('/posts');
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const creatingPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}/edit`,updatedPost);
export const likePost = (postId,userId) => API.patch(`/posts/${postId}/like`,userId);
export const deletePost = (id) => API.delete(`/posts/${id}` , id);
export const commentPost = (id,comment) => API.post(`/comments/${id}`,comment);
export const fetchComments = (id) => API.get(`/comments/${id}`);
export const deleteComment = (id) => API.delete(`/comments/${id}`);
export const editComment = (id,updatedComment) => API.patch(`/comments/${id}/edit`, updatedComment);

export const signIn = (formData) => API.post('/auth/signin', formData);
export const signInWithGoogle = (formData) => API.post('/auth/google', formData);
export const signUp = (formData) => API.post('/auth/signup', formData);

export const fetchUser = (id) => API.get(`/user/${id}`);
export const fetchUsers = () => API.get('/user');
export const follow = (id,userId) => API.patch(`/user/${id}/follow/${userId}`);
export const unfollow = (id,userId) => API.patch(`/user/${id}/unfollow/${userId}`);


