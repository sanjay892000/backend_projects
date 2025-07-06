import React, { useState } from 'react'
import listingContext from './listingContext';
import { toast } from 'react-toastify';

function ListingState({ children }) {

    const [allListing, setAllListing] = useState([])

    const successToast = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
    const errorToast = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const addListing = async(listing)=>{}
    const getAllListings = async()=>{}
    const deleteListing = async(id)=>{}
    const updateListing = async(id, listing)=>{}
    const getListingByUser = async(id)=>{}
   



    return (
        <listingContext.Provider value={{allListing, setAllListing, addListing, getAllListings, updateListing, deleteListing, getListingByUser}}>
            {children}
        </listingContext.Provider>
    )
}

export default ListingState
