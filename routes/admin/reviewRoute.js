const express = require("express");
const router = express.Router();
const {
  approveReview,
  disapproveReview,
  deleteReview,
  getAllReviews,
} = require("../../controllers/admin/reviewController");

router.get("/", getAllReviews);
router.delete("/delete/:id", deleteReview);
router.patch("/approve/:id", approveReview);
router.patch("/disapprove/:id", disapproveReview);

module.exports = router;
