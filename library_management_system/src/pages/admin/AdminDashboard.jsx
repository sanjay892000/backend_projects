import React from "react";
import AdminSidebar from "../../components/sidebar/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />

      <main className="ml-64 p-6 w-full bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Welcome Admin 👋
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">📚 Total Books</h3>
            <p className="text-3xl font-bold mt-2">120</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">👨‍🎓 Students</h3>
            <p className="text-3xl font-bold mt-2">75</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">📖 Issued Books</h3>
            <p className="text-3xl font-bold mt-2">40</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">🛠️ Admins</h3>
            <p className="text-3xl font-bold mt-2">3</p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
