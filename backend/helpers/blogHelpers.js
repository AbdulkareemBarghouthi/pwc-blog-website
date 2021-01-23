const { decodeToken } = require('./authHelpers');

const handleUserSelectedOptions = (options)=>{
    return options? options.split(',').join(' '): '';
}

const userAuthorized = (token, blogUser="") =>{
    const user = decodeToken(token);
    if(user.role === "admin") return true;
    if(user._id.toString() === blogUser.toString()) return true;
    return false;
}

module.exports = {
    handleUserSelectedOptions,
    userAuthorized
};