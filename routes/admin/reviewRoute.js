const express = require("express");
const router = express.Router();
const {
  approveReview,
  disapproveReview,
  deleteReview,
  getAllReviews,
  getPendingReviews,
  getReviewStats,
} = require("../../controllers/admin/reviewController");

router.get("/", getAllReviews);
router.get("/pending", getPendingReviews);
router.get("/stats", getReviewStats);
router.delete("/delete/:id", deleteReview);
router.patch("/approve/:id", approveReview);
router.patch("/disapprove/:id", disapproveReview);

module.exports = router;
