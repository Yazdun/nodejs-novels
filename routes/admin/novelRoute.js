const express = require("express");
const router = express.Router();

const {
  createNovel,
  updateNovel,
  deleteNovel,
  getAllNovels,
  getNovel,
} = require("../../controllers/admin/novelController");

router.get("/", getAllNovels);
router.get("/find/:id", getNovel);
router.post("/create", createNovel);
router.patch("/update/:id", updateNovel);
router.delete("/delete/:id", deleteNovel);

module.exports = router;
