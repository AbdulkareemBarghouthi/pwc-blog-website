const jwt = require('jsonwebtoken');
const User = require('../database/user');
const tokenSecret = 'my-token-secret';

const generateToken = (user)=>{
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'});
}


const verifyUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) res.status(403).json({ status: 403, message: 'Authorization not found' });
    else {
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if (err) res.status(500).json({status: 500, message: 'Failed to authenticate token' });
            req.user = value.data;
            next();
        });
    }
}

const decodeToken = (token) => {
    return jwt.decode(token.split(" ")[1]).data;
}


module.exports = {
    generateToken,
    verifyUser,
    decodeToken
}