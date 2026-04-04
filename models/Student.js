const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  studentId: {
    type: String,
    unique: true,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);