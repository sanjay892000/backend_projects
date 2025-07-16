import React, { useState } from 'react'
import listingContext from './listingContext';
import { toast } from 'react-toastify';
import baseUrls from './../../baseUrls';

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


    const addListing = async (listing) => {
        try {
            const response = await fetch(`${baseUrls}/api/wanderlust/addpost`, {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
                body: listing
            });
            const data = await response.json();
            console.log(data)
            if (data.success) {
                successToast(data.message)
            }
            else {
                errorToast(data.message)
            }
        } catch (error) {
            errorToast('Internal server error!')
        }

    }


    const getAllListings = async () => {
        try {
            const response = await fetch(`${baseUrls}/api/wanderlust/getpost`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            console.log(data)
            if (data.success) {
                setAllListing(data.results)
            }
            else {
               console.log("not success post")
            }
        } catch (error) {
            errorToast('Internal server error!')
        }
    }


    const deleteListing = async (id) => {
        try {
            const response = await fetch(`${baseUrls}/api/wanderlust/deletepost/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            if (data.success) {
                successToast(data.message)
                setAllListing(allListing.filter(listing => listing._id !== id))
            }
            else {
                errorToast(data.message)
            }
        } catch (error) {
            errorToast('Internal server error!')
        }
     }


    const updateListing = async (id, listing) => { 
        try {
            const response = await fetch(`${baseUrls}/api/wanderlust/updatepost/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(listing)
            });
            const data = await response.json();
            if (data.success) {
                successToast(data.message)
                setAllListing(allListing.map(item => item._id === id ? { ...item, ...listing } : item))
            }
            else {
                errorToast(data.message)
            }
        } catch (error) {
            errorToast('Internal server error!')
        }
    }
    

    const likePost = async (id) => {
        try {
            const response = await fetch(`${baseUrls}/api/wanderlust/likepost/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            console.log(data)
            if (data.success) {
                setAllListing(allListing.map(item => item._id === id ? data.post : item))
            }
        } catch (error) {
            errorToast('Internal server error!')
        }
    }


    return (
        <listingContext.Provider value={{ allListing, setAllListing, addListing, getAllListings, updateListing, deleteListing, likePost }}>
            {children}
        </listingContext.Provider>
    )
}

export default ListingState
