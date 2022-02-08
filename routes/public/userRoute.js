const express = require("express");
const router = express.Router();
const { getUser } = require("../../controllers/public/userController");

router.get("/find/:id", getUser);

module.exports = router;
