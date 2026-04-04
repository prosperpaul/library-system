const express = require("express");
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudent,
} = require("../controllers/studentController");
const { validateStudent } = require("../middleware/validate");

router.post("/", ...validateStudent, createStudent);
router.get("/", getStudents);
router.get("/:id", getStudent);

module.exports = router;