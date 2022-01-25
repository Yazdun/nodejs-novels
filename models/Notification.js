const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    receiverRef: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "receiver is required"],
    },
    novelRef: {
      type: mongoose.Types.ObjectId,
      ref: "Novel",
      required: [true, "novel is required"],
    },
    reviewRef: {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
    type: {
      type: String,
      enum: ["success", "fail"],
      required: [true, "type is required"],
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
