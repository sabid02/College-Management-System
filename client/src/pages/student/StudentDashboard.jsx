import React, { useState, useEffect } from "react";
import StudentNavbar from "../../components/StudentNavbar";
import axios from "axios";

const StudentDashboard = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(""); // Keeps track of the selected topic
  const [message, setMessage] = useState({ text: "", type: "" }); // Unified message state
  const [topicStatus, setTopicStatus] = useState(""); // To store the status of the selected topic

  const studentId = localStorage.getItem("_id");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/topics/all-topic"
        );
        setTopics(response.data);
      } catch (err) {
        setMessage({
          text: "Failed to fetch topics. Please try again.",
          type: "error",
        });
      }
    };

    const checkIfTopicSelected = () => {
      const savedTopicId = localStorage.getItem("selectedTopicId");
      const savedTopicStatus = localStorage.getItem("topicStatus");

      if (savedTopicId && savedTopicStatus) {
        setSelectedTopicId(savedTopicId);
        setTopicStatus(savedTopicStatus);
      }
    };

    fetchTopics();
    checkIfTopicSelected();
  }, []);

  const handleSelectTopic = async (topicId) => {
    if (selectedTopicId) {
      setMessage({
        text: "You can only select one topic. Please cancel your current selection first.",
        type: "error",
      });
      return;
    }

    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        "http://localhost:7000/api/topic/select",
        { studentId, topicId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSelectedTopicId(topicId); // Update the selected topic id
        setTopicStatus("Pending"); // Set the initial status as Pending

        // Save to localStorage
        localStorage.setItem("selectedTopicId", topicId);
        localStorage.setItem("topicStatus", "Pending");

        setMessage({ text: "Topic selected successfully!", type: "success" });
      }
    } catch (err) {
      setMessage({
        text: "Failed to select topic. Please try again.",
        type: "error",
      });
    }
  };

  const handleCancelTopic = async (topicId) => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("Cancelling Topic with ID:", topicId); // Debugging log

      const response = await axios.delete(
        `http://localhost:7000/api/topic/cancel/${topicId}`, // Use the topicId from the argument
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSelectedTopicId(""); // Reset the selected topic
        setTopicStatus(""); // Reset the topic status

        // Remove from localStorage
        localStorage.removeItem("selectedTopicId");
        localStorage.removeItem("topicStatus");

        setMessage({
          text: "Topic selection canceled successfully!",
          type: "success",
        });
      }
    } catch (err) {
      setMessage({
        text: "Failed to cancel topic selection. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <StudentNavbar />

      <div className="w-full px-8 py-6 bg-white rounded-lg shadow-lg mt-8 mb-12">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-4">
          Student Dashboard
        </h2>
        <p className="text-lg text-center text-gray-600 mb-8">
          Welcome to the student portal. Here you can choose your project topic.
        </p>

        {message.text && (
          <div
            className={`mt-4 text-center ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mt-8 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-700">
            Select a Topic:
          </h3>
          <ul className="space-y-6 mt-4">
            {topics.map((topic) => (
              <li
                key={topic._id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border rounded-md bg-gray-50 shadow-sm hover:bg-gray-100 transition-all"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2 md:mb-0 w-64">
                  {topic.topicName}
                </div>

                <div className="flex-1 ml-0 md:ml-4 text-lg text-gray-700">
                  <p className="mb-2">
                    <strong>Description:</strong> {topic.description}
                  </p>
                  <p className="mb-2">
                    <strong>Requirements:</strong> {topic.requirements}
                  </p>
                  <p className="mb-2">
                    <strong>Deadline:</strong>{" "}
                    {new Date(topic.deadline).toLocaleDateString()}
                  </p>
                  <p className="mb-2">
                    <strong>Teacher:</strong> {topic.teacherName}
                  </p>
                  <p className="mb-2">
                    <strong>Created At:</strong>{" "}
                    {new Date(topic.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:space-x-4">
                  {/* Button with a simplified conditional render */}
                  <button
                    onClick={() => {
                      if (selectedTopicId === topic._id) {
                        handleCancelTopic(topic._id);
                      } else {
                        handleSelectTopic(topic._id);
                      }
                    }}
                    className={`py-3 px-6 rounded-lg font-semibold transition-all shadow-lg ${
                      selectedTopicId === topic._id
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    disabled={selectedTopicId && selectedTopicId !== topic._id}
                  >
                    {selectedTopicId === topic._id
                      ? "Cancel Selection"
                      : "Select"}
                  </button>

                  {/* Show the status beside the button */}
                  {selectedTopicId === topic._id && topicStatus && (
                    <div className="text-sm text-gray-500">
                      <strong>Status:</strong> {topicStatus}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
