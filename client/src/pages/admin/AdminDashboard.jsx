import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaRegFileAlt,
  FaChartLine,
  FaCog,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [view, setView] = useState("dashboard");

  // Demo data for students, teachers, and topics
  const demoStudents = [
    { id: 1, name: "Student 1", email: "student1@gmail.com" },
    { id: 2, name: "Student 2", email: "student2@gmail.com" },
    { id: 3, name: "Student 3", email: "student3@gmail.com" },
    { id: 4, name: "Student 4", email: "student4@gmail.com" },
    { id: 5, name: "Student 5", email: "student5@gmail.com" },
    { id: 6, name: "Student 6", email: "student6@gmail.com" },
    { id: 7, name: "Student 7", email: "student7@gmail.com" },
    { id: 8, name: "Student 8", email: "student8@gmail.com" },
    { id: 9, name: "Student 9", email: "student9@gmail.com" },
    { id: 10, name: "Student 10", email: "student10@gmail.com" },
    { id: 11, name: "Student 11", email: "student11@gmail.com" },
    { id: 12, name: "Student 12", email: "student12@gmail.com" },
  ];

  const demoTeachers = [
    { id: 1, username: "teacher1", email: "teacher1@gmail.com" },
    { id: 2, username: "teacher2", email: "teacher2@gmail.com" },
    { id: 3, username: "teacher3", email: "teacher3@gmail.com" },
    { id: 4, username: "teacher4", email: "teacher4@gmail.com" },
    { id: 5, username: "teacher5", email: "teacher5@gmail.com" },
  ];

  const demoTopics = [
    {
      id: 1,
      name: "topic1",
      description:
        "A project to build an AI system for detecting potholes using image processing.",
    },
    {
      id: 2,
      name: "AI-based Pothole Detection",
      description:
        "A project to build an AI system for detecting potholes using image processing.",
    },
    {
      id: 3,
      name: "AI-based Pothole Detection",
      description:
        "A project to build an AI system for detecting potholes using image processing.",
    },
    {
      id: 4,
      name: "AI-based Pothole Detection",
      description:
        "A project to build an AI system for detecting potholes using image processing.",
    },
    {
      id: 5,
      name: "AI-based Pothole Detection",
      description:
        "A project to build an AI system for detecting potholes using image processing.",
    },
    {
      id: 6,
      name: "AI-based Pothole Detection",
      description:
        "A project to build an AI system for detecting potholes using image processing.",
    },
    {
      id: 7,
      name: "AI-based Pothole Detection",
      description:
        "A project to build an AI system for detecting potholes using image processing.",
    },
    {
      id: 8,
      name: "AI-based Pothole Detection",
      description:
        "A project to build an AI system for detecting potholes using image processing.",
    },
    {
      id: 9,
      name: "topic2",
      description:
        "A project to build an AI system for detecting potholes using image processing.",
    },
  ];

  // Function to handle delete (for students and topics)
  const handleDelete = (id, category) => {
    if (category === "students") {
      // Delete student logic (just filter for demo purposes)
      demoStudents.filter((student) => student.id !== id);
    } else if (category === "teachers") {
      // Delete teacher logic (just filter for demo purposes)
      demoTeachers.filter((teacher) => teacher.id !== id);
    } else if (category === "topics") {
      // Delete topic logic (just filter for demo purposes)
      demoTopics.filter((topic) => topic.id !== id);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-blue-700 text-white p-6 rounded-r-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-8">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setView("dashboard")}
              className="text-lg flex items-center space-x-3 p-3 rounded-md border-b-2 border-blue-600 hover:bg-blue-800 transition-all w-full text-left"
            >
              <FaTachometerAlt className="text-2xl" />
              <span>Dashboard</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setView("students")}
              className="text-lg flex items-center space-x-3 p-3 rounded-md border-b-2 border-blue-600 hover:bg-blue-800 transition-all w-full text-left"
            >
              <FaUsers className="text-2xl" />
              <span>Manage Students</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setView("teachers")}
              className="text-lg flex items-center space-x-3 p-3 rounded-md border-b-2 border-blue-600 hover:bg-blue-800 transition-all w-full text-left"
            >
              <FaChalkboardTeacher className="text-2xl" />
              <span>Manage Teachers</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setView("topics")}
              className="text-lg flex items-center space-x-3 p-3 rounded-md border-b-2 border-blue-600 hover:bg-blue-800 transition-all w-full text-left"
            >
              <FaRegFileAlt className="text-2xl" />
              <span>Manage Topics</span>
            </button>
          </li>
          <li>
            <Link to="/">
              {" "}
              <a
                href="#"
                className="text-lg flex items-center space-x-3 p-3 rounded-md border-b-2 border-blue-600 hover:bg-red-800 transition-all"
              >
                <FaCog className="text-2xl" />
                <span>Logout</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8">
        {/* Navbar with Profile */}
        <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-8">
          <h2 className="text-3xl font-semibold text-gray-700">
            Admin Dashboard
          </h2>
          <div className="relative">
            <button className="flex items-center space-x-2 text-lg bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-all">
              <span>Hello, Admin1</span>
              <img
                src="/7915522.png"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </button>
          </div>
        </div>

        {/* Demo Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Total Students Card */}
          <div className="bg-white p-6 rounded-md shadow-lg flex justify-between items-center hover:shadow-xl transition-all">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Total Students
              </p>
              <p className="text-3xl font-bold text-blue-600">
                {demoStudents.length}
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <FaUsers className="text-4xl text-blue-600" />
            </div>
          </div>

          {/* Total Teachers Card */}
          <div className="bg-white p-6 rounded-md shadow-lg flex justify-between items-center hover:shadow-xl transition-all">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Total Teachers
              </p>
              <p className="text-3xl font-bold text-blue-600">
                {demoTeachers.length}
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <FaChalkboardTeacher className="text-4xl text-blue-600" />
            </div>
          </div>

          {/* Total Topics Card */}
          <div className="bg-white p-6 rounded-md shadow-lg flex justify-between items-center hover:shadow-xl transition-all">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                Total Topics
              </p>
              <p className="text-3xl font-bold text-blue-600">
                {demoTopics.length}
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <FaRegFileAlt className="text-4xl text-blue-600" />
            </div>
          </div>
        </div>

        {/* Dynamic Content Section */}
        <div className="p-6 bg-gray-100 rounded-lg">
          {view === "dashboard" && (
            <h2 className="text-2xl font-semibold">
              Welcome to the Admin Dashboard
            </h2>
          )}

          {view === "students" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Student List</h2>
              <div className="space-y-4">
                {demoStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
                  >
                    <span className="text-lg">{student.name}</span>
                    <span className="text-gray-600">{student.email}</span>
                    <div className="space-x-4">
                      <button
                        onClick={() => handleDelete(student.id, "students")}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "teachers" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Teacher List</h2>
              <div className="space-y-4">
                {demoTeachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
                  >
                    <span className="text-lg">{teacher.username}</span>
                    <span className="text-gray-600">{teacher.email}</span>
                    <div className="space-x-4">
                      <button
                        onClick={() => handleDelete(teacher.id, "teachers")}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "topics" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Topic List</h2>
              <div className="space-y-4">
                {demoTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
                  >
                    <span className="text-lg">{topic.name}</span>
                    <span className="text-gray-600">{topic.description}</span>
                    <div className="space-x-4">
                      <button
                        onClick={() => handleDelete(topic.id, "topics")}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
