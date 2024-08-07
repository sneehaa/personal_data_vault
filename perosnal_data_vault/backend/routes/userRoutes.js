const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  ],
  userController.register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  ],
  userController.loginUser
);

router.get("/:id/verify/:token/", userController.verifyEmail);
router.get("/profile/:userId", userController.getUserProfile);

module.exports = router;
