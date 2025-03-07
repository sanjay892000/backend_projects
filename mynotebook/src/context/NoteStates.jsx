import React, { Children, useState } from 'react'
import { noteContext } from './noteContext'
import baseUrls from '../baseUrls';

function NoteStates({ children }) {

    let [allNotes, setAllNotes] = useState([]);

    
    const addNotes = async (title, description, tag, image) => {
        try {
            let formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('tag', tag);
            if (image) formData.append('image', image);
            const res = await fetch(`${baseUrls}/api/notes/addnotes`, formData, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-token': localStorage.getItem('token'),
                },

            })
            const data = await res.json();
            console.log(data);
            setAllNotes(allNotes.concat(data))

        } catch (error) {
            console.log(error);
        }
    }

    const getNotes = async () => {
        try {
            const res = await fetch(`${baseUrls}/api/notes/getnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
            })
            const data = await res.json()
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    const updateNotes = (notes) => {

    }

    const deleteNotes = (notes) => {

    }


    return (
        <noteContext.Provider value={{ allNotes, setAllNotes, addNotes, getNotes, updateNotes, deleteNotes }}>
            {children}
        </noteContext.Provider>
    )
}

export default NoteStates
