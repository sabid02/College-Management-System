import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <h1 className="text-4xl font-bold text-white mb-8">
        Welcome to Shanghai Polytechnic University
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/signin"
          className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-blue-500 hover:text-white transition-all duration-300"
        >
          <div className="text-2xl font-semibold">Admin Portal</div>
        </Link>
        <Link
          to="/teacher/signin"
          className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-purple-500 hover:text-white transition-all duration-300"
        >
          <div className="text-2xl font-semibold">Teacher Portal</div>
        </Link>
        <Link
          to="/student/signin"
          className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-green-500 hover:text-white transition-all duration-300"
        >
          <div className="text-2xl font-semibold">Student Portal</div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
