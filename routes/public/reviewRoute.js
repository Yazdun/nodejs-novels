const express = require("express");
const router = express.Router();
const {
  getNovelReviews,
} = require("../../controllers/public/reviewController");

router.get("/novel/:id", getNovelReviews);

module.exports = router;
