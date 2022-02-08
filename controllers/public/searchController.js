const { Novel, Author } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");
const MiniSearch = require("minisearch");

const toRemove = [
  "the",
  "a",
  "is",
  "are",
  "of",
  "an",
  "in",
  "am",
  "to",
  "was",
  "were",
  "be",
  "and",
];

const search = async (req, res) => {
  const { searchTerm } = req.query;
  if (!searchTerm) throw new BadRequestError("provide search term");

  novels = await Novel.find({}, ["title", "image", "author"]);
  authors = await Author.find({}, ["name", "image", "stars"]);

  let splitedSearchTerm = searchTerm.toLowerCase().split(" ");

  toRemove.map((removeTerm) => {
    splitedSearchTerm = splitedSearchTerm.filter((searchTerm) => {
      return searchTerm != removeTerm;
    });
    return splitedSearchTerm;
  });

  const search = splitedSearchTerm.join(" ");

  let searchNovels = new MiniSearch({
    fields: ["title"],
    storeFields: ["_id", "title", "author", "image"],
    searchOptions: {
      fuzzy: 0.3,
    },
  });
  searchNovels.addAll(novels);
  let novelResults = searchNovels.search(search);

  let searchAuthors = new MiniSearch({
    fields: ["name"],
    storeFields: ["_id", "name", "image", "stars"],
    searchOptions: {
      fuzzy: 0.5,
    },
  });
  searchAuthors.addAll(authors);
  let authorResults = searchAuthors.search(search);

  res.status(StatusCodes.OK).json({ novelResults, authorResults });
};

module.exports = { search };
