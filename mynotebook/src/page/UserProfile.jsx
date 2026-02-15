import { useState } from "react";
import { useAuthState } from "../contextapi/Authstate";

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);

    const { profile, updateProfile } = useAuthState();
    const [user, setUser] = useState(profile);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProfile(user);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* Header */}
                <div className="bg-rose-200 h-40 relative">
                    <div className="absolute -bottom-16 left-6">
                        <img
                            src={user?.avatar || "https://sanjay892000.netlify.app/assets/myimg-flpKdm1F.jpeg"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
                        />
                    </div>
                </div>

                <div className="pt-20 px-6 pb-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                            <h2 className="text-2xl font-bold capitalize text-gray-800">
                                {user?.name}
                            </h2>
                            <p className="text-gray-500">{user?.email}</p>
                        </div>

                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-4 md:mt-0 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition"
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(false)}
                                className="mt-4 md:mt-0 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                    <div className="my-6 border-t"></div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <InputField
                                label="Full Name"
                                name="name"
                                value={user?.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />

                            <InputField
                                label="Phone"
                                name="phone"
                                value={user?.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />

                            <InputField
                                label="Age"
                                name="age"
                                value={user?.age}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />

                            <InputField
                                label="Gender"
                                name="gender"
                                value={user?.gender}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />

                            <InputField
                                label="City"
                                name="city"
                                value={user?.city}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />

                            <InputField
                                label="State"
                                name="state"
                                value={user?.state}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />

                            <InputField
                                label="Country"
                                name="country"
                                value={user?.country}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />

                            <InputField
                                label="Pincode"
                                name="pincode"
                                value={user?.pincode}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />

                            <div className="md:col-span-2">
                                <label className="text-sm text-gray-500">Address</label>
                                <textarea
                                    name="address"
                                    value={user?.address}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-1 outline-none disabled:border-gray-100 disabled:bg-gray-50"
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </form>

                </div>
            </div>
        </div>
    );
};

/* Reusable Input Component */
const InputField = ({ label, name, value, onChange, disabled }) => (
    <div>
        <label className="text-sm text-gray-500">{label}</label>
        <input
            type="text"
            name={name}
            value={value || ""}
            onChange={onChange}
            disabled={disabled}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-1 outline-none disabled:border-gray-100 disabled:bg-gray-50"
        />
    </div>
);

export default UserProfile;