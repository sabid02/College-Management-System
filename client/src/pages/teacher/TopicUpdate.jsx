import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams for topicId

const TopicUpdate = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const { topicId } = useParams(); // This should be fine

  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch topic data to pre-populate the form fields
  useEffect(() => {
    console.log("Topic ID:", topicId); // Log to verify the topicId
    const fetchTopic = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/topics/get-topic/${topicId}`
        );

        console.log("Fetched Topic Data:", response.data);

        const topic = response.data;
        setTopicName(topic.topicName);
        setDescription(topic.description);
        setRequirements(topic.requirements);
        setDeadline(topic.deadline);
      } catch (err) {
        setError("Failed to fetch topic. Please try again.");
      }
    };

    fetchTopic();
  }, [topicId]);

  // Handle form submission for updating the topic
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

    // Get the teacher's _id and token from localStorage
    const Id = localStorage.getItem("_id");
    const token = localStorage.getItem("access_token");

    if (!Id) {
      setError("Teacher is not logged in.");
      return;
    }

    try {
      // Send the updated topic data to the server
      const response = await axios.put(
        `http://localhost:7000/api/topics/update/${topicId}`, // Append topicId to the URL
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setTopicName("");
        setDescription("");
        setRequirements("");
        setDeadline("");

        // Wait for 5 seconds before redirecting
        setTimeout(() => {
          navigate(`/teacher/dashboard/${Id}`); // Redirect to the teacher dashboard
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update topic. Please try again.");
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
          Update Topic
        </h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        {success && (
          <div className="text-green-600 text-center mb-4">
            Topic updated successfully!
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
            Update Topic
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

export default TopicUpdate;
