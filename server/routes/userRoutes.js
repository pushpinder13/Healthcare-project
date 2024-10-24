
// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();




// router.post("/register", async (req, res) => {
//     try {
//         const { firstName, lastName, age, bloodGroup, gender, phoneNumber, password } = req.body;

//         const newUser = new User({ firstName, lastName, age, bloodGroup, gender, phoneNumber, password });

//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully", user: newUser });
//     } catch (error) {
//         res.status(400).json({ message: "Error registering user", error });
//     }
// });
// router.post("/login", async (req, res) => {
//     try {
//         const { phoneNumber, password } = req.body;

//         const user = await user.findOne({ phoneNumber });
//         if (!user) {
//             return res.status(400).json({ message: "User not found" });
//         }

//         if (user.password !== password) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         res.status(200).json({
//             message: "Login successfully"
//         });
//     } catch (error) {
//         res.status(400).json({ message: "Error logging in", error });
//     }
// }); 
// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/userModels"); 

router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, age, bloodGroup, gender, phoneNumber, password } = req.body;

        const newUser = new User({ firstName, lastName, age, bloodGroup, gender, phoneNumber, password });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error); 
        res.status(400).json({ message: "Error registering user", error: error.message }); 
    }
});

module.exports = router;
