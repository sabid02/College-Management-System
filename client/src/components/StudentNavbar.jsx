import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentNavbar = () => {
  const [profile, setProfile] = useState({
    username: localStorage.getItem("studentUsername"),
    _id: localStorage.getItem("studentId"),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("studentUsername");
    const studentId = localStorage.getItem("studentId");

    if (username && studentId) {
      setProfile({ username, _id: studentId });
    } else {
      setProfile({ username: "Guest", _id: null });
    }
  }, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Optionally, clear cookies (if any cookies are set)
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });

    // Redirect to the home page
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Dashboard Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-blue-300 transition duration-200"
        >
          Dashboard
        </Link>

        {/* Profile and Links */}
        <div className="flex items-center space-x-6">
          <div className="text-right text-white">
            {profile.username ? (
              <>
                <p className="text-lg font-semibold">
                  Hello, {profile.username}
                </p>
                <p className="text-sm">ID: {profile._id}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          {/* Profile Image */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
            <img
              src="/7915522.png" // Default profile image
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
