const express = require('express');
const router = express.Router();
const User = require('../database/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken, userExists } = require('../helpers/authHelpers');
// const middleware = require('../middleware');
const rounds = 10;
const tokenSecret = 'my-token-secret';

router.get('/login', async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username });
        if (!foundUser) res.status(404).json({ message: 'User not found' })
        else {
            bcrypt.compare(req.body.password, foundUser.password, (error, match) => {
                if (error) res.status(500).json({ message: error })
                else if (match) res.status(200).json({ token: generateToken(foundUser), message: 'Successfully logged in' })
                else res.status(403).json({ message: 'Passwords do not match' });
            });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.post('/register', (req, res) => {
    const { body } = req;

    if (userExists(body.username)) {
        res.status(409).json({ message: 'User already exists' });
        return;
    };

    bcrypt.hash(body.password, rounds, async (error, hash) => {
        if (error) res.status(500).json(error)
        else {
            const newUser = User({ username: body.username, password: hash, role: body.role });
            try {
                const createdUser = await newUser.save();
                res.status(200).json({ token: generateToken(createdUser), message: "User Created Successfully" });
            } catch (error) {
                res.status(500).json({ message: error });
            }
        }
    });
});

module.exports = router;