import React, { useEffect } from 'react'
import ListingCard from './ListingCard'
import { useListingContext } from '../contextapi/listingContext/listingContext'
import { useAuthContext } from '../contextapi/authContext/authContext'

function Listing({hidden, userid=""}) {

  const {allListing, getAllListings, yourPost} = useListingContext()

  const authId = localStorage.getItem('userid') || '';
  
  useEffect(() => {
    if(hidden){
      getAllListings()
    }
    else {
      yourPost()
    }
  }, [hidden, userid])


  return (
    <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div class="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {allListing?.length > 0 ? allListing.map((element) => {
          return <ListingCard key={element._id}
            title={element.title}
            description={element.description}
            image={element.image}
            price={element.price}
            location={element.location}
            country={element.country}
            createdAt={element.createdAt}
            createdby={element.createdby}
            like={element.like}
            comment={element.comment}
            rating={element.rating}
            authId={authId}
            id={element._id}
            hidden={hidden}
            />
        }) : (
          <div className="text-center col-span-3">
            <p className="text-lg font-bold">{ hidden ? 'No anyone list added' : 'Your List is Empty'} </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Listing
