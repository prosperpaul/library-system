const express = require("express");
const router = express.Router();
const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  getOverdueBooks,
} = require("../controllers/bookController");
const { validateBook, validateBorrow } = require("../middleware/validate");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", protect, ...validateBook, createBook);
router.get("/", getBooks);
router.get("/overdue", protect, getOverdueBooks);
router.get("/:id", getBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, adminOnly, deleteBook);
router.post("/:id/borrow", protect, ...validateBorrow, borrowBook);
router.post("/:id/return", protect, returnBook);

module.exports = router;
