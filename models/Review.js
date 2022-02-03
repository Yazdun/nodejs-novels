const mongoose = require("mongoose");
const Notification = require("./Notification");

const ReviewSchema = new mongoose.Schema(
  {
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
      minlength: 20,
    },
    rate: {
      type: Number,
      required: [true, "rate is required"],
      enum: [1, 2, 3, 4, 5],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isDisapproved: {
      type: Boolean,
      default: false,
    },
    isPending: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.methods.createNotification = async function (type) {
  await Notification.deleteMany({
    receiverRef: this.createdBy,
    novelRef: this.novelRef,
    reviewRef: this.reviewRef,
  });
  await Notification.create({
    receiverRef: this.createdBy,
    novelRef: this.novelRef,
    reviewRef: this.reviewRef,
    type: type,
  });
};

ReviewSchema.methods.deleteNotifications = async function () {
  await Notification.deleteMany({
    receiverRef: this.createdBy,
    novelRef: this.novelRef,
    reviewRef: this.reviewRef,
  });
};

module.exports = mongoose.model("Review", ReviewSchema);
