const mongoose = require("mongoose");

const libraryAttendantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  staffId: {
    type: String,
    unique: true,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("LibraryAttendant", libraryAttendantSchema);