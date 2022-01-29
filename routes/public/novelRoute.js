const express = require("express");
const router = express.Router();
const {
  getAllNovels,
  getNovel,
  getRelatedNovels,
} = require("../../controllers/public/novelController");

router.get("/", getAllNovels);
router.get("/find/:id", getNovel);
router.get("/related/:id", getRelatedNovels);

module.exports = router;
