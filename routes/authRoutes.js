
const express = require("express");
const router = express.Router();
const { register, login, forgotPassword, resetPassword } = require("../controllers/authController");
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { message: "Too many attempts, please try again after 15 minutes" },
});

router.post("/register", authLimiter, [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
], register);

router.post("/login", authLimiter, [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
], login);

router.post("/forgot-password", authLimiter, [
  body("email").isEmail().withMessage("Valid email is required"),
], forgotPassword);

router.post("/reset-password", [
  body("token").notEmpty().withMessage("Token is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
], resetPassword);

module.exports = router;