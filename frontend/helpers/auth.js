import jwt from "jwt-decode";

const getUser = () => {
  if (typeof localStorage !== "undefined") {
    return jwt(localStorage.getItem("token"));
  }
  return null;
};

export { getUser };
