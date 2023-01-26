import { createContext, useEffect, useState } from "react";

export const UpdateContext = createContext();

export const UpdateContextProvider = ({children}) =>{
    const [currentId,setCurrentId] = useState(JSON.parse(JSON.stringify(localStorage.getItem("postId"))) || null);

    const updatepostId = (id) =>{
        setCurrentId(id);
    }

    useEffect(() => {
        localStorage.setItem("postId" , currentId)
    },[currentId]);

    return (
        <UpdateContext.Provider value={{currentId, updatepostId}}>
            {children}
        </UpdateContext.Provider>
    )
}
