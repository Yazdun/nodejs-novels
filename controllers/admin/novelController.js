const { Novel, Author, Review } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const createNovel = async (req, res) => {
  const authorExists = await Author.findOne({
    name: req.body.author.toLowerCase(),
  });
  if (authorExists) req.body.authorInfo = authorExists._id;

  const novel = await Novel.create(req.body);
  res.status(StatusCodes.CREATED).json({ novel });
};

const updateNovel = async (req, res) => {
  const {
    params: { id: novelId },
  } = req;

  const author = await Author.findOne({ name: req.body.author });
  if (author) req.body.authorInfo = author._id;
  else if (!author) req.body.authorId = null;

  const novel = await Novel.findOneAndUpdate(
    { _id: novelId },
    { ...req.body, title: req.body.title.toLowerCase() },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!novel) throw new NotFoundError(`No novel with id ${novelId}`);

  res.status(StatusCodes.OK).json({ novel });
};

const getAllNovels = async (req, res) => {
  const novels = await Novel.find().sort("createdAt");
  novels.reverse();
  res.status(StatusCodes.OK).json({ novels });
};

const getNovel = async (req, res) => {
  const {
    params: { id: novelId },
  } = req;

  const novel = await Novel.findOne({ _id: novelId }).populate("authorInfo");
  if (!novel) throw new NotFoundError(`No novel with id ${novelId}`);

  const reviews = await Review.find({ novelRef: novelId });
  let basedOnReviews = 0;
  let rate = 0;

  if (reviews) {
    basedOnReviews = reviews.length;
    rate = Math.round(
      reviews
        .map((review) => {
          return review.rate;
        })
        .reduce((accumulator, a) => {
          return accumulator + a;
        }, 0) / reviews.length
    );
  }

  res.status(StatusCodes.OK).json({ novel, rate, basedOnReviews });
};

const deleteNovel = async (req, res) => {
  const {
    params: { id: novelId },
  } = req;

  const novel = await Novel.findOneAndRemove({
    _id: novelId,
  });

  if (!novel) throw new NotFoundError(`No novel with id ${novelId}`);

  res.status(StatusCodes.OK).send();
};

module.exports = {
  createNovel,
  updateNovel,
  deleteNovel,
  getAllNovels,
  getNovel,
};
