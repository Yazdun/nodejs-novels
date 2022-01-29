const { Novel, Author, Review } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");
const { shuffle } = require("../../utils");

const getAuthor = async (req, res) => {
  const {
    params: { id: authorId },
  } = req;

  const author = await Author.findOne({ _id: authorId });
  if (!author) throw new NotFoundError(`No author with id ${authorId}`);

  res.status(StatusCodes.OK).json({ author });
};

const getRandomAuthors = async (req, res) => {
  const {
    params: { id: authorId },
  } = req;

  const authors = await Author.find();
  shuffle(authors);
  const randomAuthors = authors
    .filter((author) => {
      return author._id !== authorId;
    })
    .slice(0, 3);

  res.status(StatusCodes.OK).json({ randomAuthors });
};

getAuthorNovels = async (req, res) => {
  const {
    params: { id: authorId },
  } = req;

  const novels = await Novel.find({ authorInfo: authorId });

  res.status(StatusCodes.OK).json({ novels });
};

module.exports = {
  getAuthor,
  getRandomAuthors,
  getAuthorNovels,
};
