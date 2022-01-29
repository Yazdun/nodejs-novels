const express = require("express");
const router = express.Router();
const {
  updateUser,
  getUser,
} = require("../../controllers/protected/userController");

router.patch("/update", updateUser);
router.get("/", getUser);
module.exports = router;
