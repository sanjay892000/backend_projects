import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";
import signupImg from "../assets/signuppng.png";
import { useAuthState } from "../context/AuthState";

const Signup = () => {

    const { signupFunc, loader } = useAuthState();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
            return setError("All fields are required");
        }

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }
        await signupFunc({ name, email, password });
    };

    return (
        <section className="py-16 bg-gradient-to-b from-pink-100 via-white to-white flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">

                    {/* Left Illustration */}
                    <div className="flex justify-center">
                        <img
                            src={signupImg}
                            alt="Sign up Illustration"
                            className="max-w-md w-full"
                        />
                    </div>

                    {/* Right Form */}
                    <div className="max-w-md w-full mx-auto">
                        <h2 className="text-xl font-medium mb-8 text-center md:text-left">
                            Sign up
                        </h2>

                        {error && (
                            <p className="text-red-500 text-sm mb-4">
                                {error}
                            </p>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Name */}
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-400 rounded-md px-5 py-3 mb-5 focus:outline-none"
                            />

                            {/* Email */}
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email id"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-400 rounded-md px-5 py-3 mb-5 focus:outline-none"
                            />

                            {/* Password */}
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-gray-400 rounded-md px-5 py-3 mb-5 focus:outline-none"
                            />

                            {/* Confirm Password */}
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full border border-gray-400 rounded-md px-5 py-3 mb-6 focus:outline-none"
                            />

                            {/* Login Link */}
                            <Link to="/login" className="text-sm">
                                If you have an account?{" "}
                                <span className="font-medium cursor-pointer hover:underline">
                                    Login
                                </span>
                            </Link>

                            {/* Button */}
                            <button
                                disabled={loader}
                                className="w-44 mt-8 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white py-3 rounded-full font-medium block mx-auto md:mx-0"
                            >
                                {loader ? "Creating..." : "Sign up"}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Signup;
