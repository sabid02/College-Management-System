import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const StudentSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For displaying error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login data to the backend
      const response = await fetch("http://localhost:7000/api/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // If login is successful
        localStorage.setItem("studentUsername", data.res.username);
        localStorage.setItem("studentId", data.res.studentId);
        localStorage.setItem("_id", data.res._id);
        localStorage.setItem("token", data.token); // Save the token to localStorage
        navigate("/student/dashboard"); // Redirect to Student Dashboard
      } else {
        // Handle invalid credentials
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Student Sign In
        </h2>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Sign In
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/student/signup"
              className="text-blue-500 hover:text-blue-600"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default StudentSignIn;
