import React, { useState, useEffect, useContext } from 'react';
import './form.scss';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import app from '../../firebase.js'

import { createPost} from '../../actions/posts';
import { FormpageContext } from '../../context/formPageContext';
import { updatePost } from '../../actions/posts.js';


const Form = ({ currentId, setCurrentId }) => {
  const [video, setVideo] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const [img, setImg] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));
  const [postData, setPostData] = useState({ title: '', desc: '', tags: []});
  const posts = useSelector((state) => (state.posts));

  const post = useSelector((state) => ( currentId!==null ? state.posts.posts.find(element => element._id === currentId): null))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const getValue = (value) => {
    setValue(value);
  };
  const {toggleOpen ,formpage} = useContext(FormpageContext);


  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', desc: '', tags: []});
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === null) {
      dispatch(createPost({ ...postData, creator: user?.name, userId: user?._id, profilePic: user?.img }, navigate));
      clear();
      toggleOpen();
    } else {
      dispatch(updatePost(currentId, { ...postData, creator: user?.name}));
      clear();
      toggleOpen();

    }
  };

  const uploadFile = (file,urlType) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPostData((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  }

  useEffect(() => {
    video && uploadFile(video , "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  if (!user) {
    return (
      <Paper className="paper" elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

 
  

  return (
    <div className="formpage">
    <Paper className="paper" elevation={6}>
      <CancelIcon onClick={() => {toggleOpen();
         setCurrentId(null)}} style={{cursor:"pointer"}}/>

      <form autoComplete="off" noValidate className="form" onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post?.title}"` : 'Creating a Memory'}</Typography>
        {/* <RichTextEditor initialValue="" getValue={getValue} /> */}
      <TextField name="title"  label="Title" variant="outlined" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
      <TextField name="desc" className="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.desc} onChange={(e) => setPostData({ ...postData, desc: e.target.value })}/>
      {filePerc > 0 ? (
          "Uploading:" + filePerc
        ) : (
          <input
            type="file"
            onChange={(e) => (e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/))? setImg(e.target.files[0]): setVideo(e.target.files[0])}
          />
        )}
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        {/* <div className={classes.fileInput}></div> */}
        <Button className="buttonSubmit" variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
    </div>
  );
};

export default Form;
