const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },

    lastName: { type: String, required: true },


    age: { type: Number, required: true },

    bloodGroup: { type: String, required: true },

    gender: { type: String, required: true },

    phoneNumber: { type: String, required: true, unique: true },

    password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
