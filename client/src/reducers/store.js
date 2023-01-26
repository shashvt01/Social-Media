import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.js";
import postsReducer from "./posts.js";
import commentsReducer from "./comments.js"
import userReducer from "./user.js";
import { createStore, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk'; 

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";

  import storage from "redux-persist/lib/storage";
import allusersReducer from "./allusers.js";

  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

const rootReducer = combineReducers({ user: authReducer , posts:postsReducer , comments:commentsReducer, requser:userReducer, allusers:allusersReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer);


  
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
  export const persistor = persistStore(store);