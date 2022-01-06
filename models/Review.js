const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "user is required"],
  },
  novelRef: {
    type: mongoose.Types.ObjectId,
    ref: "Novel",
    required: [true, "novel is required"],
  },
  content: {
    type: String,
    required: [true, "content is required"],
    minlength: 2,
    maxlength: 1000,
  },
  rate: {
    type: Number,
    required: [true, "rate is required"],
    enum: [1, 2, 3],
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
