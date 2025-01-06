import mongoose from "mongoose";

// TopicSelection Schema
const topicSelectionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Reference to Student model
      required: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic", // Reference to Topic model
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", // Default status is 'pending'
    },
  },
  { timestamps: true }
);

const TopicSelection = mongoose.model("TopicSelection", topicSelectionSchema);

export default TopicSelection;
