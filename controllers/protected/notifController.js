const { Review, Novel, Notification } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllNotifs = async (req, res) => {
  const { userId } = req.user;

  const notifications = await Notification.find({
    receiverRef: userId,
  })
    .populate("novelRef", ["image", "title", "_id"])
    .sort("createdAt");

  notifications.reverse();

  await Notification.updateMany(
    { receiverRef: userId, isSeen: false },
    { $set: { isSeen: true } }
  );
  res.status(StatusCodes.OK).json({ notifications });
};

const isNotif = async (req, res) => {
  const { userId } = req.user;

  const notifications = await Notification.find({
    receiverRef: userId,
    isSeen: false,
  });

  //   res.status(StatusCodes.OK).json({ notifications });
  res
    .status(StatusCodes.OK)
    .json({ isNotif: notifications.length > 0 ? true : false });
};

module.exports = {
  getAllNotifs,
  isNotif,
};
