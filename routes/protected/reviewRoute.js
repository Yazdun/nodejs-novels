const express = require("express");
const router = express.Router();
const {
  createReview,
  deleteReview,
  updateReview,
  getReviews,
} = require("../../controllers/protected/reviewController");

router.get("/", getReviews);
router.post("/create/:id", createReview);
router.delete("/delete/:id", deleteReview);
router.patch("/update/:id", updateReview);

module.exports = router;
