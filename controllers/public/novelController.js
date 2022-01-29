const { Novel, Review } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { shuffle } = require("../../utils");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllNovels = async (req, res) => {
  const novels = await Novel.find();
  shuffle(novels);
  res.status(StatusCodes.OK).json({ novels });
};

const getNovel = async (req, res) => {
  const {
    params: { id: novelId },
  } = req;

  const novel = await Novel.findOne({ _id: novelId }).populate("authorInfo", [
    "image",
    "name",
    "stars",
  ]);
  if (!novel) throw new NotFoundError(`No novel with id ${novelId}`);

  const reviews = await Review.find({ novelRef: novelId, isApproved: true });
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

const getRelatedNovels = async (req, res) => {
  const {
    params: { id: novelId },
  } = req;

  const novel = await Novel.findOne({ _id: novelId });
  if (!novel) throw new NotFoundError(`No novel with id ${novelId}`);

  const authorNovels = await Novel.find({
    authorInfo: novel.authorInfo,
  });

  if (!authorNovels) {
    const defaultNovels = await Novel.find();
    shuffle(defaultNovels);
    const relatedNovels = defaultNovels.slice(0, 3);

    res.status(StatusCodes.OK).json({ relatedNovels });
  } else {
    shuffle(authorNovels);
    const relatedNovels = authorNovels
      .filter((i) => {
        return i._id !== novelId;
      })
      .slice(0, 3);
    res.status(StatusCodes.OK).json({ relatedNovels });
  }
};

module.exports = {
  getAllNovels,
  getNovel,
  getRelatedNovels,
};
``;
