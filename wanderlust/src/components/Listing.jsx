import React from 'react'
import ListingCard from './ListingCard'

function Listing() {
  return (
   <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div class="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
               <ListingCard/>
               <ListingCard/>
               <ListingCard/>
            </div>
        </div>
  )
}

export default Listing
