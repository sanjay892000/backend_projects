import React from "react";
import { Link } from "react-router-dom";

const StudentSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-blue-700 text-white fixed">
      <div className="p-6 text-2xl font-bold border-b border-blue-500">
        📚 Student Panel
      </div>

      <nav className="mt-6 flex flex-col gap-2 px-4">
        <Link
          to="/student/dashboard"
          className="px-4 py-2 rounded hover:bg-blue-600"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/student/my-books"
          className="px-4 py-2 rounded hover:bg-blue-600"
        >
          📖 My Books
        </Link>

        <Link
          to="/student/profile"
          className="px-4 py-2 rounded hover:bg-blue-600"
        >
          👤 Profile
        </Link>

        <button className="mt-6 bg-red-500 px-4 py-2 rounded hover:bg-red-600">
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
};

export default StudentSidebar;
