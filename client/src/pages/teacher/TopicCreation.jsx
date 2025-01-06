import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const TopicCreation = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset success and error states
    setError("");
    setSuccess(false);

    // Check if all fields are filled
    if (!topicName || !description || !requirements || !deadline) {
      setError("All fields are required.");
      return;
    }

    const formData = {
      topicName,
      description,
      requirements,
      deadline,
    };

    // Get the teacher's _id from localStorage
    const Id = localStorage.getItem("_id");
    const token = localStorage.getItem("access_token");

    console.log(token);

    if (!Id) {
      setError("Teacher is not logged in.");
      return;
    }

    try {
      // Updated URL: Append _id as part of the path
      const response = await axios.post(
        `http://localhost:7000/api/topics/create/${Id}`, // Append _id to the URL path
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setTopicName("");
        setDescription("");
        setRequirements("");
        setDeadline("");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to create topic. Please try again.");
    }
  };

  // Handle the back button click
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Create New Topic
        </h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        {success && (
          <div className="text-green-600 text-center mb-4">
            Topic created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="topicName"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Topic Name
            </label>
            <input
              type="text"
              id="topicName"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter topic name"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter topic description"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="requirements"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Requirements
            </label>
            <textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter requirements"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="deadline"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Deadline (Date & Time)
            </label>
            <input
              type="datetime-local"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Create Topic
          </button>
        </form>

        {/* Back button */}
        <button
          onClick={handleBack}
          className="mt-4 py-2 px-4 bg-gray-300 text-black rounded-lg hover:bg-gray-400 focus:ring-2 focus:ring-gray-500"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TopicCreation;
