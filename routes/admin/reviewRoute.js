const express = require("express");
const router = express.Router();
const {
  submitReview,
  suspendReview,
  deleteReview,
  getAllReviews,
} = require("../../controllers/admin/reviewController");

// router.get("/", getReviews);
// router.post("/create/:id", createReview);
// router.delete("/delete/:id", deleteReview);
router.patch("/submit/:id", submitReview);

module.exports = router;
