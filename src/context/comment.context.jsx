import { createContext, useState } from "react";

export const CommentContext = createContext();

export const CommentContextProvider = ({children}) =>{

    const [comment, setcomment] = useState([]);

    return (
        <CommentContext.Provider value={{
            comment,setcomment
        }}>
        {children}
        </CommentContext.Provider>
    )
}
