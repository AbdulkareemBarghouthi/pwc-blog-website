import React, { useState } from "react";
import AuthLayout from "../../layouts/authLayout";
import { LoginCard } from "../../styles/generalComponents";
import { DimBackground, Input, Button } from "../../styles/generalComponents";
import Link from "next/link";
import {useRouter} from 'next/router';
import { loginUser } from "../../api-integration/authentication";

const Login = (props) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  const handleLogin = async () => {
    if (username.length === 0 || password.length === 0) {
      setWarningMessage("Please fill in your username and password");
      return;
    }

    try {
      const loginResponse = await loginUser(username, password);
      if(loginResponse.status === 200){
        localStorage.setItem('token', loginResponse.data.token);
        router.push('/feeds');
        return;
      }

      setWarningMessage('Something went wrong');
    } catch (error) {
      console.log(error);
      if(error.response && error.response.data.message) setWarningMessage(error.response.data.message)
      else {
        setWarningMessage('Something went wrong');
      }
      
    }
    
  };
  return (
    <AuthLayout>
      <DimBackground>
        <LoginCard>
          <h2>Login</h2> 

          <p className="warning">{warningMessage.length > 0 ? warningMessage: ""}</p>

          <div className="body">
            <label>
              <p>Username</p>
              <Input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                type="text"
                placeholder="John doe"
              />
            </label>

            <label>
              <p>Password</p>
              <Input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                placeholder="xxxxxx"
              />
            </label>

            <div onClick={handleLogin} className="login-button">
              <Button>Login</Button>
            </div>
            <p>
              Don't have an account?{" "}
              <Link href="/auth/register">
                <a>Register</a>
              </Link>
            </p>
          </div>
        </LoginCard>
      </DimBackground>
    </AuthLayout>
  );
};

export default Login;
