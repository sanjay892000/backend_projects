import React, { useState } from 'react'
import { useListingContext } from '../contextapi/listingContext/listingContext';

function AddListing() {
    const [listData, setListData] = useState({ title: "", description: "", price: "", location: "", country: "" });
    const [image, setImage] = useState(null);

    const { addListing } = useListingContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setListData({
            ...listData,
            [name]: value
        });
    }
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', listData.title);
        formData.append('description', listData.description);
        formData.append('price', listData.price);
        formData.append('location', listData.location);
        formData.append('country', listData.country);
        formData.append('image', image);
        addListing(formData);
        setListData({ title: "", description: "", price: "", location: "", country: "" });
        setImage(null);

    }

    return (
        <section className="bg-gray-100 dark:bg-gray-900 transition-all duration-300 ease-in-out text-gray-900 dark:text-gray-100">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                    <div className="lg:col-span-2 lg:py-12">
                        <h1 className="font-bold py-2 text-2xl ">Listing Your Place </h1>
                        <p className="max-w-xl text-lg">
                            Share your space and start earning today! List your room, apartment, or home in just a few easy steps. Add photos, set your price, and describe your place — we’ll help you reach thousands of travelers looking for stays like yours.

                        </p>

                        <div className="mt-8">
                            <a href="#" className="text-2xl font-bold text-orange-600"> Start hosting with Prabhat today! </a>

                            <address className="mt-2 not-italic">282 Kevin Brook, Imogeneborough, CA 58517</address>
                        </div>
                    </div>

                    <div className="rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <form action="/listing/newlisting" method="POST" className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="sr-only" for="title">Title</label>
                                <input className="w-full border rounded-lg border-gray-200 p-3 text-sm" placeholder="Title"
                                    name="title" type="text" id="title" value={listData.title} onChange={handleChange} />
                            </div>

                            <div>
                                <label className="sr-only" for="description">Description</label>

                                <textarea className="w-full border rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Description" name="description" rows="4" id="description" value={listData.description} onChange={handleChange}></textarea>
                            </div>

                            <div>
                                <label className="sr-only" for="image">Image</label>
                                <input className="w-full border rounded-lg border-gray-200 p-3 text-sm"
                                    name="image" type="file" id="image" onChange={handleImageChange} />
                            </div>


                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="sr-only" for="price">Price</label>
                                    <input className="w-full border rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Price" type="number" name="price" id="price" value={listData.price} onChange={handleChange}/>
                                </div>

                                <div>
                                    <label className="sr-only" for="country">Country</label>
                                    <input className="w-full border rounded-lg border-gray-200 p-3 text-sm" name="country"
                                        placeholder="Country" type="tel" id="country" value={listData.country} onChange={handleChange} />
                                </div>
                            </div>

                            <div>
                                <label className="sr-only" for="Location">Location</label>
                                <input className="w-full border rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Location" name="location" type="text" id="Location" value={listData.location} onChange={handleChange} />
                            </div>

                            <div className="mt-5">
                                <button type="submit"
                                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto">
                                    Add Listing
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddListing
