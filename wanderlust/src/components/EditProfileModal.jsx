import { Modal } from '@mui/material'
import React from 'react'

function EditProfileModal({ open, handleClose }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
                <div class="font-std mb-10 inset-x-20 bottom-2 top-10 overflow-auto bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-10 font-normal leading-relaxed shadow-xl absolute">

                    <div class="flex flex-col">
                        <div class="flex flex-col md:flex-row justify-between mb-5 items-start">
                            <h2 class="mb-5 text-4xl font-bold text-gray-900 dark:text-gray-100">Update Profile</h2>
                            <div class="text-center">
                                <div>
                                    <img src="https://i.pravatar.cc/300" alt="Profile Picture" class="rounded-full w-32 h-32 mx-auto border-4 border-gray-800 mb-4 transition-transform duration-300 hover:scale-105 ring ring-gray-300" />
                                    <input type="file" name="profile" id="upload_profile" hidden required />

                                    <label for="upload_profile" class="inline-flex items-center">
                                        <svg data-slot="icon" class="w-5 h-5 text-gray-900 dark:text-gray-100" fill="none" stroke-width="1.5"
                                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                            </path>
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                            </path>
                                        </svg>
                                    </label>
                                </div>
                                <button class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-300 ring ring-gray-300 hover:ring-gray-300">
                                    Change Profile Picture
                                </button>
                            </div>
                        </div>


                        <form class="space-y-4">

                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" id="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500" value="John Doe" />
                            </div>
                            <div>
                                <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                                <input type="text" id="title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500" value="Software Developer" />
                            </div>
                            <div>
                                <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
                                <textarea class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500" name="bio" id="bio" rows={4}></textarea>
                            </div>

                            <div>
                                <label for="organization" class="block text-sm font-medium text-gray-700">Organization</label>
                                <input type="text" id="organization" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500" value="Estep Bilişim" />
                            </div>


                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500" value="john.doe@example.com" />
                            </div>
                            <div>
                                <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                                <input type="tel" id="phone" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500" value="+1 (555) 123-4567" />
                            </div>
                            <div>
                                <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
                                <input type="text" id="location" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500" value="San Francisco, CA" />
                            </div>


                            <div class="flex justify-end space-x-4">
                                <button type="button" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400" onClick={handleClose}>Cancel</button>
                                <button type="submit" class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">Save Changes</button>
                            </div>
                        </form>
                    </div>

                </div>
        </Modal>
    )
}

export default EditProfileModal
