const express = require("express");
const router = express.Router();
const User = require("../models/userModels");
const bcrypt = require("bcrypt"); // Make sure bcrypt is imported
const { validateJwtToken } = require("../middleware/jwtAuthMiddleware");
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/userControllers");
// Registration Route
router.post("/register", registerUser)

// Login Route
router.post("/login", validateJwtToken, loginUser)
router.get("/myaccount", validateJwtToken, getUserProfile)
router.patch("/update", validateJwtToken, updateUserProfile)

module.exports = router;
