const express = require("express");
const router = express.Router();
const {
  createAttendant,
  getAttendants,
} = require("../controllers/attendantController");
const { validateAttendant } = require("../middleware/validate");

router.post("/", ...validateAttendant, createAttendant);
router.get("/", getAttendants);

module.exports = router;