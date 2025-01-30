const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userSchema = require('../schemas/userSchema');

const User = mongoose.model("User", userSchema); // Define model only once

// Sign-Up Route
router.post('/signup', async (req, res) => {  // Use POST instead of GET
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: "Signup was successful!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Signup failed!",
            error: error.message, // Send error details for debugging
        });
    }
});




module.exports = router;
