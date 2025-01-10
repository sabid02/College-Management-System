import React from "react";

const StudentList = () => {
  // Demo student data
  const students = [
    { id: "123", name: "Student 1", email: "student1@gmail.com" },
    { id: "124", name: "Student 2", email: "student2@gmail.com" },
    { id: "125", name: "Student 3", email: "student3@gmail.com" },
    { id: "126", name: "Student 4", email: "student4@gmail.com" },
    { id: "127", name: "Student 5", email: "student5@gmail.com" },
    { id: "128", name: "Student 6", email: "student6@gmail.com" },
    { id: "129", name: "Student 7", email: "student7@gmail.com" },
    { id: "130", name: "Student 8", email: "student8@gmail.com" },
    { id: "131", name: "Student 9", email: "student9@gmail.com" },
    { id: "132", name: "Student 10", email: "student10@gmail.com" },
    { id: "133", name: "Student 11", email: "student11@gmail.com" },
    { id: "134", name: "Student 12", email: "student12@gmail.com" },
    { id: "135", name: "Student 13", email: "student13@gmail.com" },
    { id: "136", name: "Student 14", email: "student14@gmail.com" },
    { id: "137", name: "Student 15", email: "student15@gmail.com" },
    { id: "138", name: "Student 16", email: "student16@gmail.com" },
    { id: "139", name: "Student 17", email: "student17@gmail.com" },
    { id: "140", name: "Student 18", email: "student18@gmail.com" },
    { id: "141", name: "Student 19", email: "student19@gmail.com" },
    { id: "142", name: "Student 20", email: "student20@gmail.com" },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Student List</h2>
      <div className="space-y-4">
        {students.map((student, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            <p className="text-xl font-semibold text-blue-600">
              {student.name}
            </p>
            <p className="text-gray-500">ID: {student.id}</p>
            <p className="text-gray-500">Email: {student.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
