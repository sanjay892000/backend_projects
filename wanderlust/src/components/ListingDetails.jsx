import React, { useEffect, useState } from 'react'
import { useListingContext } from '../contextapi/listingContext/listingContext'
import { useParams } from 'react-router-dom'

function ListingDetails() {
  

  const { listId } = useParams()
  const { allListing } = useListingContext()

  const [list, setList] = useState({})

  useEffect(() => {
    allListing.forEach((item) => {
      if (item._id === listId) {
        console.log(item)
        setList(item)
      }
    });
  }, [listId])



  return (
    <div class="px-4 py-6 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
      <div class="grid gap-5 row-gap-10 lg:grid-cols-2">
        <div class="flex flex-col justify-center">
          <div class="max-w-xl mb-6">
            <span
              class="max-w-lg mb-6 font-sans text-sm tracking-tight text-gray-700 dark:text-gray-300">
              {new Date(list?.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                time: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <h2
              class="max-w-lg capitalize mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-none">
              {list?.title}
            </h2>
            <p class="text-base text-gray-700 dark:text-gray-300 md:text-lg">
              {list?.description}
            </p>
            <p class="text-base text-gray-700 mt-3 dark:text-gray-300 md:text-lg">
              Price:<span class="font-bold mx-2 text-gray-900 dark:text-gray-100">{list?.price}₹</span>
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
          <span
            class="max-w-lg mt-6 font-sans text-sm tracking-tight text-gray-700 dark:text-gray-300">
            {list?.location}, {list?.country}
          </span>
          <div className='flex items-center gap-10 mt-6'>
            <div>
              <img className='h-[80px] w-[80px] object-cover' src={list?.createdby?.avatar} alt="loading..." />
            </div>
            <div>
              <p class="text-base text-gray-700 dark:text-gray-300 md:text-lg"> Owner:
                <span class="font-bold mx-2 text-gray-900 dark:text-gray-100">
                  {list?.createdby?.name}
                </span>
              </p>
              <p class="text-base text-gray-700 dark:text-gray-300 md:text-lg"> Email:
                <a href={`mailto:${list?.createdby?.email}`} class="font-bold mx-2 no-underline text-gray-900 dark:text-gray-100">
                  {list?.createdby?.email}
                </a>
              </p>
              <p class="text-base text-gray-700 dark:text-gray-300 md:text-lg"> Phone:
               {list?.createdby?.phone ? <a href={`tel:+91-${list?.createdby?.phone}`} class="font-bold mx-2 no-underline text-gray-900 dark:text-gray-100">
                  {list?.createdby?.phone}
                </a> :  <span class="font-bold mx-2 no-underline text-gray-900 dark:text-gray-100">
                  {'Not available'}
                </span>}
              </p>
            </div>
          </div>
        </div>
        <div>
          <img class="object-cover w-full h-56 rounded shadow-lg sm:h-96" src={list?.image} alt="loading..." />
          <button className='mt-15 bg-orange-700 py-4 px-8 rounded-sm text-white' >Book Now</button>
        </div>
      </div>
    </div>
  )
}

export default ListingDetails
