const { Author, Novel } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const createAuthor = async (req, res) => {
  const authorExists = await Author.findOne({
    name: req.body.name.toLowerCase(),
  });

  if (authorExists)
    throw new BadRequestError(`${req.body.name} is already submitted !`);

  const author = await Author.create(req.body);

  await Novel.updateMany(
    { author: author.name },
    { $set: { authorInfo: author._id } }
  );
  res.status(StatusCodes.CREATED).json({ author });
};

const updateAuthor = async (req, res) => {
  const {
    params: { id: authorId },
  } = req;

  const targetName = req.body.name.toLowerCase();

  const isExist = await Author.findOne({ name: targetName });

  if (isExist && isExist._id.toString() !== authorId)
    throw new BadRequestError(`${targetName} is already submitted !`);

  const author = await Author.findOneAndUpdate(
    { _id: authorId },
    { ...req.body, name: targetName },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!author) throw new NotFoundError(`${targetName} doesn't exist`);

  res.status(StatusCodes.OK).json({ author });
};

const getAuthor = async (req, res) => {
  const {
    params: { id: authorId },
  } = req;

  const author = await Author.findOne({ _id: authorId });
  if (!author) throw new NotFoundError(`No author with id ${authorId}`);

  const novels = await Novel.find({ authorInfo: author._id });

  res.status(StatusCodes.OK).json({ author, novels });
};

const getAllAuthors = async (req, res) => {
  const authors = await Author.find().sort("createdAt");
  authors.reverse();
  res.status(StatusCodes.OK).json({ authors });
};

const deleteAuthor = async (req, res) => {
  const {
    params: { id: authorId },
  } = req;

  const author = await Author.findOneAndRemove({
    _id: authorId,
  });

  await Novel.updateMany(
    { authorInfo: authorId },
    { $set: { authorInfo: null } }
  );

  if (!author) throw new NotFoundError(`No author with id ${author}`);

  res.status(StatusCodes.OK).send();
};

module.exports = {
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthor,
};
