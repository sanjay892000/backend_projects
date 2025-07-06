import { createContext, useContext } from "react";

const dataContext = createContext()

export default dataContext;

export const useDataContext = ()=>{
    return useContext(dataContext)
}