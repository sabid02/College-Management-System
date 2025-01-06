import Admin from "../models/admin.user.js"; // Admin model
import Teacher from "../models/teacher.user.js";
import Student from "../models/student.user.js";

// Utility function to determine which model to query
const getModelByRole = (role) => {
  switch (role) {
    case "admin":
      return Admin;
    case "teacher":
      return Teacher;
    case "student":
      return Student;
    default:
      throw new Error("Invalid role specified");
  }
};

export const getUser = async (req, res, next) => {
  const { userId, role } = req.params; // Expecting both userId and role in the request

  try {
    // Determine the model to query based on the role
    const Model = getModelByRole(role);
    const user = await Model.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude sensitive fields like password
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.error("Error fetching user:", error);
    next(error);
  }
};
