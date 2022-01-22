const express = require("express");
const router = express.Router();
const {
  submitReview,
  suspendReview,
  deleteReview,
  getAllReviews,
} = require("../../controllers/admin/reviewController");

router.get("/", getAllReviews);
router.delete("/delete/:id", deleteReview);
router.patch("/submit/:id", submitReview);
router.patch("/suspend/:id", suspendReview);

module.exports = router;
