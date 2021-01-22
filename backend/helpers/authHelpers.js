const jwt = require('jsonwebtoken');
const User = require('../database/user');
const tokenSecret = 'my-token-secret';

const generateToken = (user)=>{
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'});
}

const userExists = async (username) => {
    try {
        const user = await User.findOne({ username });
        return user? true: false;
    } catch (error) {
        return false;
    }   
}

module.exports = {
    generateToken,
    userExists
}