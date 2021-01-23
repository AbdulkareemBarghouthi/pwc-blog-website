import jwt from 'jwt-decode';

const getUser = ()=>{
    return jwt(JSON.parse(document.cookie).token);
}

export{
    getUser
}