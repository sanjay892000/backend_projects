import React, { useEffect, useState } from 'react'
import { useListingContext } from '../contextapi/listingContext/listingContext'
import { useParams } from 'react-router-dom'

function ListingDetails() {

  const { allListing } = useListingContext()
  const { listId } = useParams()

  const [list, setList] = useState({})

  useEffect(() => {
   
    /* allListing.forEach((item) => {
      if (item._id === listId) { // Replace "some-id" with
       
      }
    }); */
    console.log(listId)
  }, [listId])



  return (
    <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div class="grid gap-5 row-gap-10 lg:grid-cols-2">
        <div class="flex flex-col justify-center">
          <div class="max-w-xl mb-6">
            <h2
              class="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error inventore alias quis!
            </h2>
            <p class="text-base text-gray-700 md:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, sequi excepturi est reprehenderit dolores debitis, officiis nesciunt cum inventore aspernatur delectus quis, cumque ea consectetur maiores quisquam quas beatae quod labore. Error nam molestias placeat dolores quasi at obcaecati maxime atque repellat ea odio, tempora vitae libero temporibus blanditiis laborum incidunt ut eos. Tempora itaque rem sequi, numquam sapiente iste reprehenderit quod repellat eum, quae amet nulla ab velit id, illum at in deleniti! Dolor quidem veritatis eum. Ipsum, quia.
            </p>
          </div>
          <p class="mb-4 text-sm font-bold tracking-widest uppercase">Features</p>
          <div class="grid space-y-3 sm:gap-2 sm:grid-cols-2 sm:space-y-0">
            <ul class="space-y-3">
              <li class="flex">
                <span class="mr-1">
                  <svg class="w-5 h-5 mt-px text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                  </svg>
                </span>
                A slice of heaven
              </li>
              <li class="flex">
                <span class="mr-1">
                  <svg class="w-5 h-5 mt-px text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                  </svg>
                </span>
                Disrupt inspire
              </li>
              <li class="flex">
                <span class="mr-1">
                  <svg class="w-5 h-5 mt-px text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                  </svg>
                </span>
                Preliminary thinking
              </li>
            </ul>
            <ul class="space-y-3">
              <li class="flex">
                <span class="mr-1">
                  <svg class="w-5 h-5 mt-px text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                  </svg>
                </span>
                Flipboard curmudgeon
              </li>
              <li class="flex">
                <span class="mr-1">
                  <svg class="w-5 h-5 mt-px text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                  </svg>
                </span>
                Storage shed
              </li>
              <li class="flex">
                <span class="mr-1">
                  <svg class="w-5 h-5 mt-px text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                  </svg>
                </span>
                Satoshi Nakamoto
              </li>
            </ul>
          </div>
        </div>
        <div>
          <img class="object-cover w-full h-56 rounded shadow-lg sm:h-96" src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" alt="" />
        </div>
      </div>
    </div>
  )
}

export default ListingDetails
