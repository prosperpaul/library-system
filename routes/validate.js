const { body, validationResult } = require("express-validator");

// Handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Author validation
const authorValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("bio").optional().isString().withMessage("Bio must be a string"),
  validate,
];

// Book validation
const bookValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("isbn").notEmpty().withMessage("ISBN is required"),
  body("authors").isArray({ min: 1 }).withMessage("At least one author is required"),
  validate,
];

// Student validation
const studentValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("studentId").notEmpty().withMessage("Student ID is required"),
  validate,
];

// Attendant validation
const attendantValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("staffId").notEmpty().withMessage("Staff ID is required"),
  validate,
];

// Borrow validation
const borrowValidation = [
  body("studentId").notEmpty().withMessage("Student ID is required"),
  body("attendantId").notEmpty().withMessage("Attendant ID is required"),
  body("returnDate").notEmpty().withMessage("Return date is required"),
  validate,
];

module.exports = {
  authorValidation,
  bookValidation,
  studentValidation,
  attendantValidation,
  borrowValidation,
};