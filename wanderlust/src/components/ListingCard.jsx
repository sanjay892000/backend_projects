import React from 'react'

function ListingCard() {
  return (
    <div class="overflow-hidden relative transition-shadow duration-300 bg-white rounded">
                        <div class="absolute top-0 right-0 bg-white/75 px-3 text-xl py-2 rounded-bl rounded-tr">
                            <i class="mx-2 fa-solid fa-pen-to-square"></i>
                            <i class="mx-2 text-red-600 fa-solid fa-eraser"></i>
                        </div>
                        <a href="listing/<%=list._id%>" aria-label="Article">
                            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
                                class="object-cover w-full h-64 rounded" alt="" />
                            </a>
                        <div class="py-5">
                            <p class="mb-2 text-xs font-semibold text-gray-600 uppercase">
                             Thu Feb 27 2025
                            </p>
                            <a href="/" aria-label="Article"
                                class="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700">
                                <p class="text-2xl font-bold leading-5">
                                   listing title
                                </p>
                            </a>
                            <p class="mb-1 text-gray-700">
                              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ut odio sit? Fugit corporis eius, vitae cupiditate quasi ex nemo!
                            </p>
                            <p class="mb-1 font-[700] text-gray-700">
                                Price: <span class="font-[600]">
                                   2099&nbsp;₹
                                </span>
                            </p>
                            <div class="flex flex-col mb-4 w-full justify-center pr-10">
                                <p class="mb-1 font-[700] text-gray-700">
                                    Location: <span class="font-[600]">
                                        Lucknow
                                    </span>
                                </p>
                                <p class="font-[700] text-gray-700">
                                    Country: <span class="font-[600]">
                                       India
                                    </span>
                                </p>
                            </div>
                            <div class="flex space-x-4">
                                <a href="/" aria-label="Likes"
                                    class="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                                    <div class="mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="2"
                                            class="w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700">
                                            <polyline points="6 23 1 23 1 12 6 12" fill="none" stroke-miterlimit="10">
                                            </polyline>
                                            <path
                                                d="M6,12,9,1H9a3,3,0,0,1,3,3v6h7.5a3,3,0,0,1,2.965,3.456l-1.077,7A3,3,0,0,1,18.426,23H6Z"
                                                fill="none" stroke="currentColor" stroke-miterlimit="10"></path>
                                        </svg>
                                    </div>
                                    <p class="font-semibold">7.4K</p>
                                </a>
                                <a href="/" aria-label="Comments"
                                    class="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                                    <div class="mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" stroke="currentColor"
                                            class="w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700">
                                            <polyline points="23 5 23 18 19 18 19 22 13 18 12 18" fill="none"
                                                stroke-miterlimit="10"></polyline>
                                            <polygon points="19 2 1 2 1 14 5 14 5 19 12 14 19 14 19 2" fill="none"
                                                stroke="currentColor" stroke-miterlimit="10"></polygon>
                                        </svg>
                                    </div>
                                    <p class="font-semibold">81</p>
                                </a>
                            </div>
                        </div>
                    </div>
  )
}

export default ListingCard
