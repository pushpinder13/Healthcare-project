const express = require("express");
const router = express.Router();
const User = require("../models/userModels");
const bcrypt = require("bcrypt"); // Make sure bcrypt is imported

// Registration Route
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, age, bloodGroup, gender, phoneNumber, password } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !age || !bloodGroup || !gender || !phoneNumber || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt rounds
        const newUser = new User({
            firstName,
            lastName,
            age,
            bloodGroup,
            gender,
            phoneNumber,
            password: hashedPassword // Save the hashed password
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error registering user", error: error.message });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        if (!phoneNumber || !password) {
            return res.status(400).json({ message: "Please provide phone number and password" });
        }

        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Respond with user information (excluding the password)
        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error logging in", error: error.message });
    }
});

module.exports = router;
