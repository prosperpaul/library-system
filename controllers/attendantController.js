const LibraryAttendant = require("../models/LibraryAttendant");

// Create attendant
const createAttendant = async (req, res) => {
  try {
    const attendant = await LibraryAttendant.create(req.body);
    res.status(201).json(attendant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all attendants
const getAttendants = async (req, res) => {
  try {
    const attendants = await LibraryAttendant.find();
    res.status(200).json(attendants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAttendant, getAttendants };