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

router.post("/", ...validateBook, createBook);
router.get("/", getBooks);
router.get("/overdue", getOverdueBooks);
router.get("/:id", getBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/:id/borrow", ...validateBorrow, borrowBook);
router.post("/:id/return", returnBook);

module.exports = router;