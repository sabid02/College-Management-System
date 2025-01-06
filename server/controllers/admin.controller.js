import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.user.js"; // Admin model

// Sign up
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required!"));
  }

  // Hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newAdmin = new Admin({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newAdmin.save();
    res.json("Admin registration successful!");
  } catch (error) {
    next(error);
  }
};

// Sign in
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validAdmin = await Admin.findOne({ email });
    if (!validAdmin) {
      return next(errorHandler(404, "Admin not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validAdmin.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: validAdmin._id, isAdmin: validAdmin.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // You can adjust the token expiration as needed
    );

    // Remove password field and send response
    const { password: pass, ...rest } = validAdmin._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ res: rest, token: token });
  } catch (error) {
    next(error);
  }
};
