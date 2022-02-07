const { User, Review, Author, Novel } = require("../../models");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { validatePasswordStrength } = require("../../utils");
const { BadRequestError, UnauthenticatedError } = require("../../errors");

const updateUser = async (req, res) => {
  const { password } = req.body;

  if (password) {
    validatePasswordStrength(password);
    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(password, salt);
  }

  const user = await User.findByIdAndUpdate(
    req.user.userId,
    {
      $set: req.body,
    },
    { new: true, runValidators: true }
  );
  if (!user)
    throw new BadRequestError(`User with id ${req.user.userId} doesn't exist`);

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { username: user.username }, token });
};

const getUser = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findOne({ _id: userId });
  if (!user) throw new UnauthenticatedError();

  const { password, _id, isAdmin, ...others } = user._doc;
  res.status(StatusCodes.OK).json({ user: others });
};

const getUserStats = async (req, res) => {
  const { userId } = req.user;

  const reviews = await Review.find({ createdBy: userId });

  const allAuthors = await Author.find();
  const authors = allAuthors.filter((author) => {
    return author.stars.includes(userId);
  });

  const allNovels = await Novel.find();
  const novels = allNovels.filter((novel) => {
    return novel.likes.includes(userId);
  });

  res.status(StatusCodes.OK).json({
    stats: {
      countReviews: reviews.length,
      countLikes: novels.length,
      countStars: authors.length,
    },
  });
};

const getUserReviews = async (req, res) => {
  const { userId } = req.user;

  const reviews = await Review.find({ createdBy: userId })
    .populate("novelRef", ["image", "title", "_id", "author"])
    .populate("createdBy", ["image", "username"])
    .sort("createdAt");

  reviews.reverse();

  res.status(StatusCodes.OK).json({ reviews });
};

const getUserStars = async (req, res) => {
  const { userId } = req.user;
  const allAuthors = await Author.find({}, ["image", "name", "stars"]);

  const authors = allAuthors.filter((author) => {
    return author.stars.includes(userId);
  });

  res.status(StatusCodes.OK).json({ authors });
};

const getUserLikes = async (req, res) => {
  const { userId } = req.user;
  const allNovels = await Novel.find({}, ["image", "title", "likes"]);

  const novels = allNovels.filter((novel) => {
    return novel.likes.includes(userId);
  });

  res.status(StatusCodes.OK).json({ novels });
};

module.exports = {
  updateUser,
  getUser,
  getUserReviews,
  getUserStars,
  getUserLikes,
  getUserStats,
};
