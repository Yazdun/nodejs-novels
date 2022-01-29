const { Review } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const getNovelReviews = async (req, res) => {
  const {
    params: { id: novelId },
  } = req;

  const reviews = await Review.find({ novelRef: novelId });

  res.status(StatusCodes.OK).json({ reviews });
};

const getUserReviews = async (req, res) => {
  const {
    params: { id: userId },
  } = req;

  const reviews = await Review.find({ createdBy: userId });

  res.status(StatusCodes.OK).json({ reviews });
};

module.exports = {
  getNovelReviews,
  getUserReviews,
};
