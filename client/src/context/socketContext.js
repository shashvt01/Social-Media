
import { createContext, useEffect, useState } from "react";

export const SocketContext = createContext();

export const SocketContextProvider = ({children}) =>{
    const [socket,setSocket] = useState(
        (localStorage.getItem("socket")) || null
    );

    const updateSocket = (socket) =>{
    setSocket(socket);
  }

    useEffect(() => {
        localStorage.setItem("socket" , socket)
    },[socket]);

    return (
        <SocketContext.Provider value={{socket, updateSocket}}>
            {children}
        </SocketContext.Provider>
    )
}

