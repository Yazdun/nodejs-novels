const express = require("express");
const router = express.Router();
const {
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthor,
} = require("../../controllers/admin/authorController");

router.get("/", getAllAuthors);
router.get("/find/:id", getAuthor);
router.post("/create", createAuthor);
router.patch("/update/:id", updateAuthor);
router.delete("/delete/:id", deleteAuthor);

module.exports = router;
