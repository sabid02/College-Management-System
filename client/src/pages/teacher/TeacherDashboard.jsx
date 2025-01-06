import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TeacherNavbar from "../../components/TeacherNavbar";

const TeacherDashboard = () => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const teacherId = localStorage.getItem("_id");

  // Fetch topics on mount
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/topics/get/${teacherId}`
        );
        setTopics(response.data);
      } catch (err) {
        setError("Failed to fetch topics.");
      }
    };
    fetchTopics();
  }, [teacherId]);

  return (
    <div>
      {/* Navbar */}
      <TeacherNavbar />

      {/* Main Dashboard Content */}
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-6">Teacher Dashboard</h1>
        <p className="text-gray-700 mb-8">
          Welcome to your dashboard! Use the options below to manage your
          topics, projects, and approvals efficiently.
        </p>

        {/* Dashboard Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Create Topic/Project */}
          <Link
            to="/create/topic"
            className="block p-6 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            <h2 className="text-2xl font-semibold">Create a Topic/Project</h2>
            <p className="mt-2 text-sm">
              You can create a topic or project for the students from here.
              Create new topics or projects effortlessly.
            </p>
          </Link>

          {/* My Topic/Project Bank */}
          <Link
            to="/topic-bank"
            className="block p-6 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
          >
            <h2 className="text-2xl font-semibold">My Topic/Project Bank</h2>
            <p className="mt-2 text-sm">
              Access your collection of saved topics or projects, explore their
              details, make edits, or share them effortlessly with others.
            </p>
          </Link>

          {/* My Topic/Project */}
          <Link
            to="/my-topics"
            className="block p-6 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition duration-300"
          >
            <h2 className="text-2xl font-semibold">Student List and ID</h2>
            <p className="mt-2 text-sm">
              Access the complete student list here to verify their identities
              and ensure they belong to your class using their unique IDs.
              Simplify student management and maintain accurate records
              effortlessly!
            </p>
          </Link>

          {/* Topic/Project Approval */}
          <Link
            to="/approvals"
            className="block p-6 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
          >
            <h2 className="text-2xl font-semibold">Topic/Project Approval</h2>
            <p className="mt-2 text-sm">
              Easily review and approve pending topics or projects at your
              convenience. Stay on top of your responsibilities and ensure that
              all topics meet the necessary criteria before approval.
            </p>
          </Link>
        </div>

        {/* Topics Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-semibold mb-4">Your Topics/Projects</h3>
          {error && <p className="text-red-500">{error}</p>}
          {topics.length === 0 ? (
            <p className="text-gray-500">
              No topics available. Please create some.
            </p>
          ) : (
            <ul className="space-y-4">
              {topics.map((topic) => (
                <li
                  key={topic._id}
                  className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-xl font-semibold">{topic.topicName}</h4>
                    <p className="text-sm text-gray-500">{topic.description}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200">
                      Update
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
