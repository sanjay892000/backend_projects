import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuth = false, role = "student" }) => {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          📚 LMS
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6">

          {!isAuth ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {role === "admin" ? (
                <Link
                  to="/admin/dashboard"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to="/user/home"
                  className="text-gray-700 hover:text-blue-600"
                >
                  My Dashboard
                </Link>
              )}

              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
