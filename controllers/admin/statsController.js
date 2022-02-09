const { Review, Author, Novel, User } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllStats = async (req, res) => {
  const users = await User.countDocuments();
  const authors = await Author.countDocuments();
  const novels = await Novel.countDocuments();
  const reviews = await Review.countDocuments({ isApproved: true });

  res.status(StatusCodes.OK).json({
    users,
    authors,
    novels,
    reviews,
  });
};

module.exports = { getAllStats };
