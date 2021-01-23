import React, { useState } from "react";
import AuthLayout from "../../layouts/authLayout";
import { LoginCard } from "../../styles/generalComponents";
import { DimBackground, Input, Button } from "../../styles/generalComponents";
import Link from "next/link";
import { registerUser } from "../../api-integration/authentication";
import { useRouter } from "next/router";

const Register = (props) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswordVal, setConfirmPasswordVal] = useState("");
  const [role, setRole] = useState("writer");
  const [warningMessage, setWarningMessage] = useState("");

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const handleRegisteration = async () => {
    if (
      username.length === 0 ||
      password.length === 0 ||
      confirmPasswordVal.length === 0
    ) {
      setWarningMessage("Please fill in all the fields");
      return;
    }

    if (password !== confirmPasswordVal) {
      setWarningMessage("Passwords Do not match");
      return;
    }

    try {
      const response = await registerUser(username, password, role);
      if (response.status === 200) {
        localStorage.setItem(
          "token",
          JSON.stringify({
            token: response.data.token,
          })
        );
        router.push("/feeds");
        return;
      }

      setWarningMessage("Something went wrong");
    } catch (error) {
      if (error.response && error.response.data.message)
        setWarningMessage(error.response.data.message);
      else {
        console.log(error);
        setWarningMessage("Something went wrong");
      }
    }
  };

  return (
    <AuthLayout>
      <DimBackground>
        <LoginCard>
          <h2>Register</h2>

          <p className="warning">
            {warningMessage.length > 0 ? warningMessage : ""}
          </p>

          <div className="body">
            <label>
              <p>Username</p>
              <Input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
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
                type="password"
                placeholder="xxxxxx"
              />
            </label>

            <label>
              <p>Confirm Password</p>
              <Input
                onChange={(e) => {
                  setConfirmPasswordVal(e.target.value);
                }}
                type="password"
                placeholder="xxxxxx"
              />
            </label>

            <label className="role-radio-group" onChange={handleRole}>
              Role:
              <input type="radio" id="male" name="role" value="admin" />
              <label htmlFor="admin">Admin</label>
              <input type="radio" id="female" name="role" value="writer" />
              <label htmlFor="writer">Writer</label>
            </label>
            <div className="login-button">
              <Button onClick={handleRegisteration}>Register</Button>
            </div>
            <p>
              Already have an account?{" "}
              <Link href="/auth/login">
                <a>Login</a>
              </Link>
            </p>
          </div>
        </LoginCard>
      </DimBackground>
    </AuthLayout>
  );
};

export default Register;
