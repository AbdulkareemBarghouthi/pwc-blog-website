import axios from "axios";

const loginUser = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("/api/auth/login", {
        params: {
          username,
          passwordm,
          role: "writer",
        },
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

const registerUser = (username, password, role) => {
    return new Promise(async(resolve, reject)=> {
        try {
            const response = await axios.post('/api/auth/register', {
                username,
                password,
                role
            });
            resolve(response);
        } catch (error){
            reject(error);
        }
        
    });
}

export { loginUser, registerUser };
