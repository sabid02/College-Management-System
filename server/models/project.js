// models/Topic.js

import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    topicName: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    deadline: { type: Date, required: true },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    teacherName: { type: String, required: true }, // Store teacher's name
  },
  { timestamps: true }
);

export default mongoose.model("Topic", topicSchema);
