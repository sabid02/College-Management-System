import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    teacherId: {
      type: String, // Now teacherId is a string input by the teacher
      required: true,
      unique: true, // Ensure the teacherId is unique
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
