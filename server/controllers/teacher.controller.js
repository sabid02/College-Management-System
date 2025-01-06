import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "../models/teacher.user.js"; // Import Teacher model
import { errorHandler } from "../utils/error.js";

// Teacher Registration
export const registerTeacher = async (req, res, next) => {
  const { username, email, password, teacherId } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !teacherId ||
    username === "" ||
    email === "" ||
    password === "" ||
    teacherId === ""
  ) {
    next(errorHandler(400, "All fields are required!"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newTeacher = new Teacher({
    username,
    email,
    password: hashedPassword,
    teacherId,
  });

  try {
    await newTeacher.save();
    res.json("Teacher registered successfully!");
  } catch (error) {
    next(error);
  }
};

// Teacher Login
export const loginTeacher = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return next(errorHandler(404, "Teacher not found"));
    }

    const validPassword = bcryptjs.compareSync(password, teacher.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign(
      { id: teacher._id, teacherId: teacher.teacherId },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = teacher._doc;

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
