import React, { useState, useEffect } from "react";
import StudentNavbar from "../../components/StudentNavbar";
import axios from "axios";

const StudentDashboard = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

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
    fetchTopics();
  }, []);

  const handleSelectTopic = async (topicId) => {
    if (selectedTopic) {
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
        const selected = topics.find((topic) => topic._id === topicId);
        setSelectedTopic({ ...selected, status: "Pending" });

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
      const response = await axios.delete(
        `http://localhost:7000/api/topic/cancel/${topicId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSelectedTopic(null);

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

  useEffect(() => {
    const fetchSelectedTopics = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No access token found in localStorage.");
          return;
        }

        const response = await axios.get(
          `http://localhost:7000/api/topic/selected/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.length > 0) {
          const selectedTopicData = response.data[0];
          if (selectedTopicData.topicId && selectedTopicData.topicId._id) {
            // Set the selected topic in the state
            setSelectedTopic({
              ...selectedTopicData.topicId,
              status: selectedTopicData.status,
            });

            // Save to localStorage for persistence
            localStorage.setItem(
              "selectedTopicId",
              selectedTopicData.topicId._id
            );
            localStorage.setItem("topicStatus", selectedTopicData.status);
          } else {
            console.warn("Invalid topic data structure:", selectedTopicData);
          }
        } else {
          console.warn("No selected topics found.");
          setSelectedTopic(null); // Reset selectedTopic if none found
        }
      } catch (err) {
        console.error(
          "Failed to fetch selected topics",
          err.response?.data || err.message
        );
      }
    };

    fetchSelectedTopics();
  }, [studentId]);

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

        {/* Selected Topic Section */}
        {selectedTopic && (
          <div className="mb-8 p-6 border rounded-md bg-green-50 shadow-sm">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Your Selected Topic:
            </h3>
            <p className="text-lg text-gray-700">
              <strong>Topic Name:</strong> {selectedTopic.topicName}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Description:</strong> {selectedTopic.description}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Status:</strong> {selectedTopic.status}
            </p>
            <button
              onClick={() => handleCancelTopic(selectedTopic._id)}
              className="mt-4 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold"
            >
              Cancel Selection
            </button>
          </div>
        )}

        {/* Topic Selection */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-700">
            Select a Topic:
          </h3>
          <ul className="space-y-6 mt-4">
            {topics.map((topic) => (
              <li
                key={topic._id}
                className="p-6 border rounded-md bg-gray-50 shadow-sm transition-all"
              >
                <div className="flex flex-col space-y-4">
                  {/* Topic Name Section */}
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-1">
                      {topic.topicName}
                    </h4>
                  </div>

                  {/* Topic Description Section */}
                  <div className="space-y-2">
                    <p className="text-lg text-gray-700">
                      <strong className="font-semibold">Description:</strong>{" "}
                      {topic.description}
                    </p>
                    <p className="text-lg text-gray-700">
                      <strong className="font-semibold">Requirements:</strong>{" "}
                      {topic.requirements}
                    </p>
                  </div>

                  {/* Select Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleSelectTopic(topic._id)}
                      className={`py-2 px-4 rounded-md font-semibold ${
                        selectedTopic
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white"
                      }`}
                      disabled={!!selectedTopic}
                    >
                      Select
                    </button>
                  </div>
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
