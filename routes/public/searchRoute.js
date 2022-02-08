const express = require("express");
const router = express.Router();

const { search } = require("../../controllers/public/searchController");

router.get("/", search);

module.exports = router;
