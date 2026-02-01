import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";
import loginImg from "../assets/loginpng.png";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
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

        if (!formData.email || !formData.password) {
            return setError("All fields are required");
        }

        try {
            setLoading(true);

            const res = await api.post("/auth/login", formData);

            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                navigate("/"); // redirect after login
            }

        } catch (err) {
            setError(
                err.response?.data?.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-26 bg-gradient-to-b from-pink-100 via-white to-white flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">

                    {/* Left Illustration */}
                    <div className="flex justify-center">
                        <img
                            src={loginImg}
                            alt="Login Illustration"
                            className="max-w-md w-full"
                        />
                    </div>

                    {/* Right Form */}
                    <div className="max-w-md w-full mx-auto">
                        <h2 className="text-xl font-medium mb-8 text-center md:text-left">
                            Sign in
                        </h2>

                        {error && (
                            <p className="text-red-500 text-sm mb-4">
                                {error}
                            </p>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Email */}
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email id"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-400 rounded-md px-5 py-3 mb-6 focus:outline-none"
                            />

                            {/* Password */}
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-gray-400 rounded-md px-5 py-3 mb-4 focus:outline-none"
                            />

                            {/* Links */}
                            <div className="flex justify-between text-sm mb-8">
                                <Link to="/signup">
                                    Don&apos;t have an account?{" "}
                                    <span className="font-medium cursor-pointer hover:underline">
                                        Sign up
                                    </span>
                                </Link>
                                <span className="cursor-pointer hover:underline">
                                    Forgot password? Reset
                                </span>
                            </div>

                            {/* Button */}
                            <button
                                disabled={loading}
                                className="w-40 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white py-3 rounded-full font-medium block mx-auto md:mx-0"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Login;
