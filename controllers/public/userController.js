const { User, Review } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../../errors");

const getUser = async (req, res) => {
  const {
    params: { id: userId },
  } = req;

  const user = await User.findOne({ _id: userId });
  if (!user) throw new NotFoundError("this user doesn't exist");

  const reviews = await Review.find({ createdBy: userId, isApproved: true })
    .populate("novelRef", ["image", "title", "_id", "author"])
    .sort("createdAt");

  reviews.reverse();

  const { password, _id, isAdmin, email, ...others } = user._doc;

  res.status(StatusCodes.OK).json({ user: others, reviews });
};

module.exports = {
  getUser,
};
