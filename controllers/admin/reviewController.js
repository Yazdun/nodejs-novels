const { Review } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const approveReview = async (req, res) => {
  const {
    params: { id: reviewId },
  } = req;

  const review = await Review.findOneAndUpdate(
    { _id: reviewId },
    { isApproved: true, isDisapproved: false, isPending: false },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!review) throw new NotFoundError(`this review doesn't exist`);

  review.createNotification("success");

  const updatedReview = await Review.findOne({ _id: reviewId })
    .populate("novelRef", ["image", "title", "author"])
    .populate("createdBy", ["username", "image"]);

  res.status(StatusCodes.OK).json({ updatedReview });
};

const disapproveReview = async (req, res) => {
  const {
    params: { id: reviewId },
  } = req;

  const review = await Review.findOneAndUpdate(
    { _id: reviewId },
    { isApproved: false, isDisapproved: true, isPending: false },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!review) throw new NotFoundError(`this review doesn't exist`);

  review.createNotification("fail");

  const updatedReview = await Review.findOne({ _id: reviewId })
    .populate("novelRef", ["image", "title", "author"])
    .populate("createdBy", ["username", "image"]);

  res.status(StatusCodes.OK).json({ updatedReview });
};

const deleteReview = async (req, res) => {
  const {
    params: { id: reviewId },
  } = req;

  const review = await Review.findOneAndRemove({
    _id: reviewId,
  });
  if (!review) throw new NotFoundError(`this review doesn't exist`);

  review.deleteNotifications();

  res.status(StatusCodes.OK).send();
};

const getAllReviews = async (req, res) => {
  const { status } = req.query;
  // console.log(status);
  let reviews = await Review.find()
    .populate("novelRef", ["image", "title", "author"])
    .populate("createdBy", ["username", "image"])
    .sort("createdAt");
  reviews.reverse();

  switch (status) {
    case "isPending":
      reviews = reviews.filter((review) => {
        return review.isPending;
      });
      break;
    case "isApproved":
      reviews = reviews.filter((review) => {
        return review.isApproved;
      });
      break;
    case "isDisapproved":
      reviews = reviews.filter((review) => {
        return review.isDisapproved;
      });
      break;

    default:
      break;
  }
  res.status(StatusCodes.OK).json({ reviews });
};

const getPendingReviews = async (req, res) => {
  const reviews = await Review.countDocuments({ isPending: true });

  res.status(StatusCodes.OK).json({ reviews });
};

module.exports = {
  approveReview,
  disapproveReview,
  deleteReview,
  getAllReviews,
  getPendingReviews,
};
