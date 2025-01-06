// controllers/topicController.js

import Topic from "../models/project.js";
import { errorHandler } from "../utils/error.js";
import Teacher from "../models/teacher.user.js";

export const createTopic = async (req, res, next) => {
  const { topicName, description, requirements, deadline } = req.body;
  const { teacherId } = req.params; // Get teacherId from the URL

  // Validate the input fields
  if (!topicName || !description || !requirements || !deadline) {
    return next(errorHandler(400, "All fields are required!"));
  }

  try {
    // Fetch teacher details using the teacherId from the URL
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return next(errorHandler(404, "Teacher not found"));
    }

    // Use teacher's information to create the new topic
    const teacherName = teacher.username; // Assuming the teacher's username is stored in the Teacher model

    // Create the new topic
    const newTopic = new Topic({
      topicName,
      description,
      requirements,
      deadline,
      teacherId, // Use the teacher's MongoDB _id
      teacherName, // Store the teacher's name (username)
    });

    await newTopic.save();
    res.status(201).json({ message: "Topic created successfully!" });
  } catch (error) {
    next(error);
  }
};

// controllers/topicController.js

export const getTopicsByTeacher = async (req, res, next) => {
  const { teacherId } = req.params;

  try {
    // Fetch all topics created by the specific teacher
    const topics = await Topic.find({ teacherId });
    if (topics.length === 0) {
      return next(errorHandler(404, "No topics found for this teacher"));
    }

    res.status(200).json(topics);
  } catch (error) {
    next(error);
  }
};

// controllers/topicController.js

export const updateTopic = async (req, res, next) => {
  const { topicId } = req.params; // Get topicId from URL params
  const { topicName, description, requirements, deadline } = req.body; // Get data from request body

  console.log(topicId);

  // Validate the input fields
  if (!topicName || !description || !requirements || !deadline) {
    return next(errorHandler(400, "All fields are required!"));
  }

  try {
    // Find the topic by its _id and update its details
    const updatedTopic = await Topic.findByIdAndUpdate(
      topicId,
      { topicName, description, requirements, deadline },
      { new: true } // Return the updated topic
    );

    if (!updatedTopic) {
      return next(errorHandler(404, "Topic not found"));
    }

    res
      .status(200)
      .json({ message: "Topic updated successfully!", updatedTopic });
  } catch (error) {
    next(error);
  }
};

// controllers/topicController.js

export const deleteTopic = async (req, res, next) => {
  const { topicId } = req.params; // Get topicId from URL params

  try {
    // Find and delete the topic by its _id
    const deletedTopic = await Topic.findByIdAndDelete(topicId);
    if (!deletedTopic) {
      return next(errorHandler(404, "Topic not found"));
    }

    res.status(200).json({ message: "Topic deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export const getTopicById = async (req, res, next) => {
  const { topicId } = req.params; // Get topicId from URL params

  try {
    // Find the topic by its topicId
    const topic = await Topic.findById(topicId);

    if (!topic) {
      return next(errorHandler(404, "Topic not found"));
    }

    res.status(200).json(topic);
  } catch (error) {
    next(error);
  }
};
