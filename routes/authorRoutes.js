const express = require("express");
const router = express.Router();
const {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const { validateAuthor } = require("../middleware/validate");

router.post("/", ...validateAuthor, createAuthor);
router.get("/", getAuthors);
router.get("/:id", getAuthor);
router.put("/:id", ...validateAuthor, updateAuthor);
router.delete("/:id", deleteAuthor);

module.exports = router;