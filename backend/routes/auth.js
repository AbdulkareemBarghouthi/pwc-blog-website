const express = require('express');
const router = express.Router();
const User = require('../database/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../helpers/authHelpers');
const rounds = 10;

router.get('/login', async (req, res) => {
    try {
        // Find the requested user
        const foundUser = await User.findOne({ username: req.query.username });

        // Check if the user exists
        if (!foundUser) res.status(404).json({ message: `The username doesn't exist`, status: 404, success: false })
        else {
            // bcrypt to hash password and after the hashing is successful handle response
            bcrypt.compare(req.query.password, foundUser.password, (error, match) => {
                if (error) res.status(500).json({ message: error, status: 500,  success: false })
                else if (match) res.status(200).json({ token: generateToken(foundUser), message: 'Successfully logged in', status: 200,  success: true })
                else res.status(403).json({ message: 'Incorrect Password',status: 403,  success: false });
            });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.post('/register', async (req, res) => {
    const { body } = req;

    // check if user exists
    const userFound = await User.findOne({ username: body.username });

    if (userFound) { 
        res.status(409).json({ message: 'User already exists',  success: false, status: 409 });
        return;
    };

    // encrypt password using 10 rounds and if that's successful create a new user
    bcrypt.hash(body.password, rounds, async (error, hash) => {
        if (error) res.status(500).json({ message: 'Error occured on server side', status: 500,  success: false})
        else {
            const newUser = User({ username: body.username, password: hash, role: body.role });
            try {
                const createdUser = await newUser.save();
                res.status(200).json({ token: generateToken(createdUser), message: "User Created Successfully", status: 200,  success: true });
            } catch (error) {
                res.status(500).json({ message: error, status: 500,  success: false});
            }
        }
    });
});

module.exports = router;