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

//login route

router.post("/login", async (req, res) => {
    try {
        const user = await User.find({username: req.body.username});
    if(user && user.length > 0){
        const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
        if(isValidPassword){
            //generate token
            const token = jwt.sign({
                username: user[0].username,
                userID: user[0]._id,
            }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
            res.status(200).json({
                "access_token" : token,
                "message" : "Login successfull"
            })
        } else {
            res.status(401).json({
                "error" : "Authenticate failed"
            });
        }
    } else {
        res.status(401).json({
            "error": "Authentication Failed!"
        });
    } 
    } catch {
        res.status(401).json({
            "error": "Authentication Failed!"
        });
    }
    
});


module.exports = router;
