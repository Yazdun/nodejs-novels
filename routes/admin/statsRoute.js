const express = require("express");
const router = express.Router();

const { getAllStats } = require("../../controllers/admin/statsController");

router.get("/", getAllStats);

module.exports = router;
