import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-blue-500 text-white p-6">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
        <ul className="mt-8 space-y-4">
          <li>
            <a href="#" className="text-lg hover:text-gray-300">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="text-lg hover:text-gray-300">
              Manage Students
            </a>
          </li>
          <li>
            <a href="#" className="text-lg hover:text-gray-300">
              Manage Teachers
            </a>
          </li>
          <li>
            <a href="#" className="text-lg hover:text-gray-300">
              Manage Topics
            </a>
          </li>
          <li>
            <a href="#" className="text-lg hover:text-gray-300">
              Statistics
            </a>
          </li>
          <li>
            <a href="#" className="text-lg hover:text-gray-300">
              Settings
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6">
        {/* Header with Profile */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">Admin Dashboard</h2>
          <div className="relative">
            <button className="flex items-center space-x-2 text-lg bg-gray-200 p-2 rounded-full">
              <span>Profile</span>
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </button>
            <div className="absolute right-0 w-48 mt-2 bg-white shadow-lg rounded-md p-4 hidden group-hover:block">
              <p className="text-sm text-gray-700">Logged in as Admin</p>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Profile
              </a>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline mt-2"
              >
                Log out
              </a>
            </div>
          </div>
        </div>

        <p className="mt-4">
          Welcome to the admin panel. Here you can manage everything!
        </p>

        {/* Additional Content (e.g., stats, links, etc.) */}
        <div className="mt-8">{/* Add more components here */}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
