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
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", protect, ...validateAuthor, createAuthor);
router.get("/", getAuthors);
router.get("/:id", getAuthor);
router.put("/:id", protect, ...validateAuthor, updateAuthor);
router.delete("/:id", protect, adminOnly, deleteAuthor);

module.exports = router;