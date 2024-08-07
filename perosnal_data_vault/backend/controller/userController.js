const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel").User;
const Token = require("../model/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { validationResult } = require("express-validator");

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 12;
const ACCOUNT_LOCKOUT_THRESHOLD = 5;

const validatePassword = (password) => {
  const upperCase = /[A-Z]/.test(password);
  const lowerCase = /[a-z]/.test(password);
  const number = /\d/.test(password);
  const specialChar = /[!@#$%^&*]/.test(password);
  return password.length >= PASSWORD_MIN_LENGTH &&
         password.length <= PASSWORD_MAX_LENGTH &&
         upperCase && lowerCase && number && specialChar;
};

// Generate verification token
const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

// Send verification email
const sendVerificationEmail = async (user) => {
  const token = generateVerificationToken();
  user.emailVerificationToken = token;
  user.emailVerificationExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const verificationUrl = `${process.env.BASE_URL}/user/${user._id}/verify/${token}`;


  await sendEmail(user.email, "Verify Email", `
    <p>Hi ${user.firstName},</p>
    <p>Thank you for registering. Please verify your email by clicking the button below:</p>
    <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #ff6f6f; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
  `);
};

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!validatePassword(password)) {
    return res.status(400).json({ 
      success: false, 
      message: "Password must be 8-12 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character." 
    });
  }

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    await sendVerificationEmail(newUser);

    res.status(201).json({ success: true, message: "User registered successfully. Please check your email for verification." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Email verification token is invalid or has expired." });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.json({ success: true, message: "Email verified successfully.", redirectUrl: '/login' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    if (!user.emailVerified) {
      return res.status(400).json({ success: false, message: "Please verify your email address." });
    }

    if (user.accountLockedUntil && new Date() < user.accountLockedUntil) {
      return res.status(403).json({ success: false, message: "Account is locked." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= ACCOUNT_LOCKOUT_THRESHOLD) {
        user.accountLockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes lockout
      }
      await user.save();
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    user.failedLoginAttempts = 0;
    user.accountLockedUntil = null;
    await user.save();

    const token = user.generateAuthToken();
    res.status(200).json({ success: true, message: "Login successful.", token, userData: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId); // Ensure the model name is correct

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userProfile = { ...user.toObject() };
    delete userProfile.password;

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully.",
      userProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


module.exports = { register, loginUser, verifyEmail, getUserProfile };
