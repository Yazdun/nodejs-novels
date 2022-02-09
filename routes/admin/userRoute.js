const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUsersStats,
} = require("../../controllers/admin/userController");

router.get("/", getAllUsers);
router.get("/stats", getUsersStats);

module.exports = router;
