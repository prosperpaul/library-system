const express = require("express");
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudent,
} = require("../controllers/studentController");
const { validateStudent } = require("../middleware/validate");
const { protect } = require("../middleware/auth");

router.post("/", protect, ...validateStudent, createStudent);
router.get("/", protect, getStudents);
router.get("/:id", protect, getStudent);

module.exports = router;