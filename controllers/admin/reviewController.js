const { Novel, Author, Review } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const submitReview = async (req, res) => {
  // TODO SUBMIT REVIEW
};

const suspendReview = async (req, res) => {
  // TODO SUSPEND REVIEW
};

const deleteNovel = async (req, res) => {
  // TODO DELETE REVIEW
};

module.exports = {
  submitNovel,
  deleteNovel,
};
