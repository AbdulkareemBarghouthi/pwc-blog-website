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
          <h2>Login</h2>
          <div class="body">
            <label>
              <p>Username</p>
              <Input type="text" placeholder="John doe" />
            </label>

            <label>
              <p>Password</p>
              <Input type="password" placeholder="xxxxxx" />
            </label>

            <div class="login-button">
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
