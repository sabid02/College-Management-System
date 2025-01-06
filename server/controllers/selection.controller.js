import TopicSelection from "../models/selection.js";

export const selectTopic = async (req, res) => {
  const { studentId, topicId } = req.body; // Extract studentId and topicId from the request body

  try {
    // Check if the topic is already selected by the student
    const existingSelection = await TopicSelection.findOne({
      studentId,
      topicId,
    });

    if (existingSelection) {
      return res.status(400).json({ message: "Topic already selected." });
    }

    // Create a new selection
    const newSelection = new TopicSelection({
      studentId,
      topicId,
      status: "pending", // Initially set status to 'pending'
    });

    await newSelection.save();
    res.status(201).json({ message: "Topic selected successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error selecting topic." });
  }
};

export const getTopicSelections = async (req, res) => {
  try {
    // Fetch topic selections, populate studentId with username and topicId with topic details
    const selections = await TopicSelection.find({ status: "pending" })
      .populate("topicId") // Populate the topicId with full topic details
      .populate("studentId", "username"); // Populate studentId with username

    res.status(200).json(selections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching topic selections." });
  }
};

export const approveOrRejectTopic = async (req, res) => {
  const { selectionId, status } = req.body; // Extract selectionId and status from request body

  // Ensure the status is either 'approved' or 'rejected'
  if (status !== "approved" && status !== "rejected") {
    return res.status(400).json({ message: "Invalid status." });
  }

  try {
    // Find the selection and update its status
    const updatedSelection = await TopicSelection.findByIdAndUpdate(
      selectionId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedSelection) {
      return res.status(404).json({ message: "Selection not found." });
    }

    res.status(200).json({ message: `Topic ${status} successfully.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating topic status." });
  }
};

// Controller function for canceling the topic selection
export const cancelTopicSelection = async (req, res) => {
  const { topicId } = req.params; // Assuming the topicId is passed in the route as a parameter

  try {
    // Find and delete the record based on the topicId
    const selection = await TopicSelection.findOneAndDelete({ topicId });

    if (!selection) {
      return res.status(404).json({ message: "Topic selection not found." });
    }

    res.status(200).json({ message: "Topic selection canceled successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error canceling topic selection." });
  }
};
