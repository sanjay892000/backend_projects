import React, { useEffect, useState } from 'react'
import { useListingContext } from '../contextapi/listingContext/listingContext';

function ListingCard({ title, description, image, price, location, country, createdAt, createdby, like, comment, rating, authId, id }) {

    const { likePost } = useListingContext();

    const [isLike, setIsLike] = useState(like?.some(user => user._id === authId));

    const handleLike = () => {
        if (authId) {
            likePost(id);
            setIsLike(!isLike);
        }
    }

    const date = new Date(createdAt);

    let totalLike = like ? like.length : 0;
    if (totalLike > 1000) {
        totalLike = (totalLike / 1000).toFixed(1) + 'K';
    }
    else if (totalLike > 1000000) {
        totalLike = (totalLike / 1000000).toFixed(1) + 'M';
    }

    let totalComment = comment ? comment.length : 0;
    if (totalComment > 1000) {
        totalComment = (totalComment / 1000).toFixed(1) + 'K';
    }
    else if (totalComment > 1000000) {
        totalComment = (totalComment / 1000000).toFixed(1) + 'M';
    }

    return (
        <div class="overflow-hidden bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 relative transition-shadow duration-300 rounded">
            <div class="absolute top-0 right-0 bg-white/75 px-3 text-xl py-2 rounded-bl rounded-tr">
                <i class="mx-2 fa-solid fa-pen-to-square"></i>
                <i class="mx-2 text-red-600 fa-solid fa-eraser"></i>
            </div>
            <a href="listing/<%=list._id%>" aria-label="Article">
                <img src={image ? image : "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg"}
                    class="object-cover w-full h-64 rounded" alt="loading..." />
            </a>
            <div class="py-5 px-5">
                <p class="mb-2 text-xs font-semibold text-gray-500 uppercase">
                    {date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </p>
                <a href="/" aria-label="Article"
                    class="inline-block mb-3 text-gray-950 dark:text-gray-50 transition-colors duration-200 hover:text-deep-purple-accent-700">
                    <p class="text-2xl font-bold leading-5">
                        {title}
                    </p>
                </a>
                <p class="mb-1 text-gray-900 dark:text-gray-300">
                    {description && description.length > 100 ? description.slice(0, 100) + '...' : description}
                </p>
                <p class="mb-1 font-[700] text-gray-900 dark:text-gray-100">
                    Price: <span class="font-[600]">
                        {price}&nbsp;₹
                    </span>
                </p>
                <div class="flex flex-col mb-4 w-full justify-center pr-10">
                    <p class="mb-1 font-[700] text-gray-900 dark:text-gray-100">
                        Location: <span class="font-[600]">
                            {location}
                        </span>
                    </p>
                    <p class="font-[700] text-gray-900 dark:text-gray-100">
                        Country: <span class="font-[600]">
                            {country}
                        </span>
                    </p>
                </div>
                <div class="flex space-x-4">
                    <span aria-label="Likes"
                        class="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                        <div class="mr-2" onClick={handleLike}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2"
                                class="w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700">
                                <polyline points="6 23 1 23 1 12 6 12" fill={isLike ? 'red' : 'none'} stroke-miterlimit="10">
                                </polyline>
                                <path
                                    d="M6,12,9,1H9a3,3,0,0,1,3,3v6h7.5a3,3,0,0,1,2.965,3.456l-1.077,7A3,3,0,0,1,18.426,23H6Z"
                                    fill={isLike ? 'skyblue' : 'none'} stroke="currentColor" stroke-miterlimit="10"></path>
                            </svg>
                        </div>
                        <p class="font-semibold text-gray-700 dark:text-gray-400">{totalLike}</p>
                    </span>
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
                        <p class="font-semibold text-gray-700 dark:text-gray-400">{totalComment}</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ListingCard
