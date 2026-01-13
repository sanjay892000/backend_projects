import React from "react";
import StudentSidebar from "../../components/sidebar/StudentSidebar";

const StudentDashboard = () => {
  return (
    <div className="flex">
      <StudentSidebar />

      <main className="ml-64 p-6 w-full bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, Student 👋
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">📚 Issued Books</h3>
            <p className="text-3xl font-bold mt-2">3</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">⏳ Pending Returns</h3>
            <p className="text-3xl font-bold mt-2">1</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">💰 Fine</h3>
            <p className="text-3xl font-bold mt-2">₹50</p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
