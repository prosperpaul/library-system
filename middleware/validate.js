const { body, validationResult } = require("express-validator");

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Author validation
const validateAuthor = [
  body("name").notEmpty().withMessage("Name is required"),
  body("bio").optional().isString().withMessage("Bio must be a string"),
  handleValidationErrors,
];

// Book validation
const validateBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("isbn").notEmpty().withMessage("ISBN is required"),
  body("authors").isArray({ min: 1 }).withMessage("At least one author is required"),
  handleValidationErrors,
];

// Student validation
const validateStudent = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("studentId").notEmpty().withMessage("Student ID is required"),
  handleValidationErrors,
];

// Attendant validation
const validateAttendant = [
  body("name").notEmpty().withMessage("Name is required"),
  body("staffId").notEmpty().withMessage("Staff ID is required"),
  handleValidationErrors,
];

// Borrow validation
const validateBorrow = [
  body("studentId").notEmpty().withMessage("Student ID is required"),
  body("attendantId").notEmpty().withMessage("Attendant ID is required"),
  body("returnDate").notEmpty().isDate().withMessage("Valid return date is required"),
  handleValidationErrors,
];

module.exports = {
  validateAuthor,
  validateBook,
  validateStudent,
  validateAttendant,
  validateBorrow,
};