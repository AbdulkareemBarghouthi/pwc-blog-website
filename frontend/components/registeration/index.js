import React from "react";
import AuthLayout from "../../layouts/authLayout";
import { LoginCard } from "../../styles/generalComponents";
import { DimBackground, Input, Button } from "../../styles/generalComponents";
import Link from "next/link";

const Login = (props) => {
  return (
    <AuthLayout>
      <DimBackground>
        <LoginCard>
          <h2>Register</h2>
          <div class="body">
            <label>
              <p>Username</p>
              <Input type="text" placeholder="John doe" />
            </label>

            <label>
              <p>Password</p>
              <Input type="password" placeholder="xxxxxx" />
            </label>

            <label>
              <p>Confirm Password</p>
              <Input type="password" placeholder="xxxxxx" />
            </label>

            <div class="login-button">
              <Button>Register</Button>
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

export default Login;
