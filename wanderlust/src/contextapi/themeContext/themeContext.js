import { createContext, useContext } from "react";

const themeContext = createContext()

export default themeContext;

export const useThemeContext = ()=>{
    return useContext(themeContext)
}