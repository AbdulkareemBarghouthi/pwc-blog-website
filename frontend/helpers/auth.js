import jwt from "jwt-decode";

const getUser = () => {
  if (typeof localStorage !== "undefined" && localStorage.getItem('token')) {
    return jwt(localStorage.getItem("token"));
  }
  return null;
};

export { getUser };
