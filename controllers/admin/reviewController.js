const { Novel, Author, Review } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const submitReview = async (req, res) => {
  const {
    params: { id: reviewId },
  } = req;

  const review = await Review.findOneAndUpdate(
    { _id: reviewId },
    { isVerified: true },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!review) throw new NotFoundError(`this review doesn't exist`);

  res.status(StatusCodes.OK).json({ review });
};

const suspendReview = async (req, res) => {
  const {
    params: { id: reviewId },
  } = req;

  const review = await Review.findOneAndUpdate(
    { _id: reviewId },
    { isVerified: false },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!review) throw new NotFoundError(`this review doesn't exist`);

  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const {
    params: { id: reviewId },
  } = req;

  const review = await Review.findOneAndRemove({
    _id: reviewId,
  });
  if (!review) throw new NotFoundError(`this review doesn't exist`);

  res.status(StatusCodes.OK).send();
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find().sort("createdAt");
  reviews.reverse();
  res.status(StatusCodes.OK).json({ reviews });
};

module.exports = {
  submitReview,
  suspendReview,
  deleteReview,
  getAllReviews,
};
