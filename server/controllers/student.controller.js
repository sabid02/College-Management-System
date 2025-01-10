import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/student.user.js"; // Import Student model
import { errorHandler } from "../utils/error.js";

// Student Registration
export const registerStudent = async (req, res, next) => {
  const { username, email, password, studentId } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !studentId ||
    username === "" ||
    email === "" ||
    password === "" ||
    studentId === ""
  ) {
    next(errorHandler(400, "All fields are required!"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newStudent = new Student({
    username,
    email,
    password: hashedPassword,
    studentId,
  });

  try {
    await newStudent.save();
    res.json("Student registered successfully!");
  } catch (error) {
    next(error);
  }
};

// Student Login
export const loginStudent = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return next(errorHandler(404, "Student not found"));
    }

    const validPassword = bcryptjs.compareSync(password, student.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign(
      { id: student._id, studentId: student.studentId },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = student._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ res: rest, token: token });
  } catch (error) {
    next(error);
  }
};

// Get All Students
export const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find({}, { password: 0 }); // Exclude password from response
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

// Delete a Student
export const deleteStudent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return next(errorHandler(404, "Student not found"));
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    next(error);
  }
};
