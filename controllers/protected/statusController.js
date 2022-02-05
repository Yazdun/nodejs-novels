const { Novel, Author } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../../errors");

const likeNovel = async (req, res) => {
  const {
    params: { id: novelId },
  } = req;
  const { userId } = req.user;

  const novel = await Novel.findOne({ _id: novelId });
  if (!novel) throw new NotFoundError(`No novel with id ${novelId}`);

  if (!novel.likes.includes(userId)) {
    await novel.updateOne({
      $push: { likes: userId },
    });
    res
      .status(StatusCodes.OK)
      .json({ likesCount: novel.likes.length + 1, hasBeenLiked: true });
  } else {
    await novel.updateOne({
      $pull: { likes: userId },
    });
    res
      .status(StatusCodes.OK)
      .json({ likesCount: novel.likes.length - 1, hasBeenLiked: false });
  }
};
const starAuthor = async (req, res) => {
  const {
    params: { id: authorId },
  } = req;
  const { userId } = req.user;

  const author = await Author.findOne({ _id: authorId });
  if (!author) throw new NotFoundError(`No author with id ${authorId}`);

  if (!author.stars.includes(userId)) {
    await author.updateOne({
      $push: { stars: userId },
    });
    res.status(StatusCodes.OK).json({ starsCount: author.stars.length + 1 });
  } else {
    await author.updateOne({
      $pull: { stars: userId },
    });
    res.status(StatusCodes.OK).json({ starsCount: author.stars.length - 1 });
  }
};

module.exports = {
  likeNovel,
  starAuthor,
};
