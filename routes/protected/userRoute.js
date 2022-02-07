const express = require("express");
const router = express.Router();
const {
  updateUser,
  getUser,
  getUserReviews,
  getUserStars,
  getUserLikes,
  getUserStats,
} = require("../../controllers/protected/userController");

router.patch("/update", updateUser);
router.get("/", getUser);
router.get("/reviews", getUserReviews);
router.get("/stars", getUserStars);
router.get("/likes", getUserLikes);
router.get("/stats", getUserStats);

module.exports = router;
