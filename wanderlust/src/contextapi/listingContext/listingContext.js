import { createContext, useContext } from "react";

const listingContext = createContext()

export default listingContext;

export const useListingContext = ()=>{
    return useContext(listingContext)
}