import React from 'react'
import './fancyloader.css'
function FancyLoader() {
    return (
        <div className='h-screen w-screen flex justify-center items-center relative z-60 bg-white'>
            <div className="loader"></div>
        </div>
    )
}

export default FancyLoader
