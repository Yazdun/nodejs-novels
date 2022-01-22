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
  // TODO SUSPEND REVIEW
};

const deleteReview = async (req, res) => {
  // TODO DELETE REVIEW
};

const getAllReviews = async (req, res) => {
  // TODO GET ALL REVIEWS
};

module.exports = {
  submitReview,
  suspendReview,
  deleteReview,
  getAllReviews,
};
