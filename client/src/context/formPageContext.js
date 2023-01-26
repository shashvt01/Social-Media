import { createContext, useEffect, useState } from "react";

export const FormpageContext = createContext();

export const FormpageContextProvider = ({children}) =>{
    const [formpage,setFormPage] = useState(
        JSON.parse(localStorage.getItem("formpage")) || false
    );

    const toggleOpen = () =>{
        setFormPage(!formpage)
    }

    useEffect(() => {
        localStorage.setItem("formpage" , formpage)
    },[formpage]);

    return (
        <FormpageContext.Provider value={{formpage, toggleOpen}}>
            {children}
        </FormpageContext.Provider>
    )
}
