import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white fixed">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        🛠️ Admin Panel
      </div>

      <nav className="mt-6 flex flex-col gap-2 px-4">

        <Link
          to="/admin/dashboard"
          className="px-4 py-2 rounded hover:bg-gray-800"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/admin/books"
          className="px-4 py-2 rounded hover:bg-gray-800"
        >
          📚 Books
        </Link>

        <Link
          to="/admin/catalog"
          className="px-4 py-2 rounded hover:bg-gray-800"
        >
          🗂️ Catalog
        </Link>

        <Link
          to="/admin/users"
          className="px-4 py-2 rounded hover:bg-gray-800"
        >
          👥 Users
        </Link>

        <Link
          to="/admin/add-admin"
          className="px-4 py-2 rounded hover:bg-gray-800"
        >
          ➕ Add New Admin
        </Link>

        <button className="mt-6 bg-red-600 px-4 py-2 rounded hover:bg-red-700">
          🚪 Logout
        </button>

      </nav>
    </aside>
  );
};

export default AdminSidebar;
