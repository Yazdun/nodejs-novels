const express = require("express");
const router = express.Router();
const {
  getAuthor,
  getRandomAuthors,
  getAuthorNovels,
} = require("../../controllers/public/authorController");

router.get("/find/:id", getAuthor);
router.get("/random/:id", getRandomAuthors);
router.get("/novels/:id", getAuthorNovels);

module.exports = router;
