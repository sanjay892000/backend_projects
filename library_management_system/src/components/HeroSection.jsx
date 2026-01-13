import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Smart Library Management System
        </h1>

        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Manage books, students, and admins efficiently using MERN Stack
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
          >
            Register
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
