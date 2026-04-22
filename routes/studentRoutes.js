const express = require("express");
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
} = require("../controllers/studentController");
const { validateStudent } = require("../middleware/validate");
const { protect } = require("../middleware/auth");

router.post("/", protect, ...validateStudent, createStudent);
router.get("/", protect, getStudents);
router.get("/:id", protect, getStudent);
router.put("/:id", protect, updateStudent);

module.exports = router;