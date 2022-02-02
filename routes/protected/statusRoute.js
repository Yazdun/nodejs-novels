const express = require("express");
const router = express.Router();
const {
  likeNovel,
  starAuthor,
} = require("../../controllers/protected/statusController");

router.patch("/novel/like/:id", likeNovel);
router.patch("/author/star/:id", starAuthor);

module.exports = router;
