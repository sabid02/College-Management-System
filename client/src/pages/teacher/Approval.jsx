import React, { useState } from "react";
import TeacherNavbar from "../../components/TeacherNavbar";

const Approval = () => {
  // Sample data for approval status with studentId, studentName, topicName, and status
  const [approvalData, setApprovalData] = useState([
    {
      id: 1,
      studentId: "S001",
      studentName: "Student 1",
      topicName: "topic1",
      status: "approved",
    },
    {
      id: 2,
      studentId: "S002",
      studentName: "Student 2",
      topicName: "AI-based Pothole Detection",
      status: "pending",
    },
    {
      id: 3,
      studentId: "S003",
      studentName: "Student 3",
      topicName: "AI-based Pothole Detection",
      status: "approved",
    },
    {
      id: 4,
      studentId: "S004",
      studentName: "Student 4",
      topicName: "AI-based Pothole Detection",
      status: "pending",
    },
    {
      id: 5,
      studentId: "S005",
      studentName: "Student 5",
      topicName: "AI-based Pothole Detection",
      status: "approved",
    },
    {
      id: 6,
      studentId: "S005",
      studentName: "Student 6",
      topicName: "AI-based Pothole Detection",
      status: "approved",
    },
    {
      id: 7,
      studentId: "S006",
      studentName: "Student 7",
      topicName: "topic2",
      status: "pending",
    },
  ]);

  // Function to handle approval
  const handleApprove = (id) => {
    setApprovalData(
      approvalData.map((item) =>
        item.id === id ? { ...item, status: "approved" } : item
      )
    );
  };

  // Function to handle rejection
  const handleReject = (id) => {
    setApprovalData(
      approvalData.map((item) =>
        item.id === id ? { ...item, status: "rejected" } : item
      )
    );
  };

  return (
    <div>
      <TeacherNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Approval Page</h2>
        <div className="space-y-4">
          {approvalData.map((item) => (
            <div
              key={item.id}
              className={`flex justify-between items-center bg-white p-4 rounded-lg shadow-md ${
                item.status === "approved"
                  ? "border-green-500 border"
                  : item.status === "pending"
                  ? "border-yellow-500 border"
                  : "border-red-500 border"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-lg font-semibold">
                  {item.studentName}
                </span>
                <span className="text-sm text-gray-500">
                  Student ID: {item.studentId}
                </span>
                <span className="text-sm text-gray-500">
                  Topic: {item.topicName}
                </span>
              </div>
              <div className="space-x-4">
                {item.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </>
                )}
                {item.status === "approved" && (
                  <span className="text-green-600 font-semibold">Approved</span>
                )}
                {item.status === "rejected" && (
                  <span className="text-red-600 font-semibold">Rejected</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Approval;
