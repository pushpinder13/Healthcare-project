// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcrypt");
// const User = require("../models/userModels");
// require("dotenv").config();

// const registerUser = asyncHandler(async (req, res) => {
//     const { name, email, password, phoneNumber } = req.body;

//     if (!name || !email || !password || !phoneNumber) {
//         res.status(400);
//         throw new Error("Please provide all fields");
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//         return res.status(400).json({ message: "User already exists" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = await User.create({
//         name,
//         email,
//         password: hashedPassword,
//         phoneNumber
//     });

//     res.status(201).json({
//         message: "User registered successfully", newUser
//     });
// });

// module.exports = {
//     registerUser,//loginUser
// }; 

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModels");
require("dotenv").config();


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;

    if (!name || !email || !password || !phoneNumber) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber
    });

    res.status(201).json({
        message: "User registered successfully",
        newUser: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
        }
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log("Login request received: ", email, password);

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            email: user.email,
            name: user.firstName,
        },
    });
});
const getUserProfile = asyncHandler(async (req, res) => {
    const { email } = req.body
    const data = await User.findOne({ email });
    try {
        if (!data) {
            return res.status(200).json({ data })
        }
    } catch {
        return res.status(500).json({ message: err.message })
    }
})
const updateUserProfile = asyncHandler(async (req, res) => {
    const { email, name, phoneNumber, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (name) {
        user.name = name;
    }
    if (phoneNumber) {
        user.phoneNumber = phoneNumber;
    }
    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
        message: "User updated successfully",
        updatedUser: {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
        },
    });
});

module.exports = {registerUser, loginUser, getUserProfile, updateUserProfile}