const { Novel, Author, Review } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAuthor = async (req, res) => {
  // GET SINGLE NOVEL
};

const getRelatedAuthors = async (req, res) => {
  // GET RELATED AUTHORS
};

module.exports = {
  getAuthor,
};
