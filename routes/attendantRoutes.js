const express = require("express");
const router = express.Router();
const {
  createAttendant,
  getAttendants,
} = require("../controllers/attendantController");
const { validateAttendant } = require("../middleware/validate");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", protect, adminOnly, ...validateAttendant, createAttendant);
router.get("/", protect, getAttendants);

module.exports = router;