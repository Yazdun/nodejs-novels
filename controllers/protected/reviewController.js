const { Review, Novel } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

// CREATE NEW REVIEW
const createReview = async (req, res) => {
  const {
    params: { id: novelId },
  } = req;

  const novel = await Novel.findOne({ _id: novelId });
  if (!novel) throw new NotFoundError(`this novel doesn't exist`);

  const isExist = await Review.findOne({
    novelRef: novelId,
    createdBy: req.user.userId,
  });
  if (isExist)
    throw new BadRequestError(
      "you've already submitted your review for this novel"
    );

  req.body.createdBy = req.user.userId;
  req.body.novelRef = novelId;

  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

// DELETE REVIEW
const deleteReview = async (req, res) => {
  const {
    params: { id: reviewId },
  } = req;

  const review = await Review.findOne({
    _id: reviewId,
    createdBy: req.user.userId,
  });
  if (!review) throw new NotFoundError(`this review doesn't exist`);

  await Review.findOneAndRemove({ _id: reviewId });
  review.deleteNotifications();

  res.status(StatusCodes.OK).send();
};

// UPDATE REVIEW
const updateReview = async (req, res) => {
  const {
    params: { id: reviewId },
  } = req;

  const review = await Review.findOneAndUpdate(
    { _id: reviewId, createdBy: req.user.userId },
    { ...req.body, isApproved: false, isDisapproved: false, isPending: true },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("novelRef", ["image", "title", "_id", "author"])
    .populate("createdBy", ["image", "username"]);
  if (!review) throw new NotFoundError(`this review doesn't exist`);

  res.status(StatusCodes.OK).json({ review });
};

// GET USER REVIEW
const getReviews = async (req, res) => {
  const userId = req.user.userId;
  const userReviews = await Review.find({ createdBy: userId });
  res.status(StatusCodes.OK).json({ userReviews });
};

module.exports = {
  createReview,
  deleteReview,
  updateReview,
  getReviews,
};
