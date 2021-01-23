import React, { useEffect, useState } from "react";
import { HeaderContainer } from "./styles";
import { Button } from "../../styles/generalComponents";
import { useRouter } from "next/router";
import { getUser } from "../../helpers/auth";

const Header = (props) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (getUser()) {
      setUser(getUser().data);
    }
  }, []);
  return (
    <HeaderContainer>
      <img className="logo" onClick={()=>{
        router.push('/feeds');
      }} src="https://180dc.org/wp-content/uploads/2015/10/pwc-logo.png" />
      {user && user.role === "admin" && (
        <p className="admin-message">
          You are an admin which means you can edit any post you like!
        </p>
      )}

      <div className="user-holder">
        {!user ? (
          <div className="button-holder">
            <Button
              onClick={() => {
                router.push("/auth/login");
              }}
              color={"#98f5ff"}
            >
              Login
            </Button>
            Or
            <Button
              onClick={() => {
                router.push("/auth/register");
              }}
              color={"#4a708b"}
            >
              Register
            </Button>
          </div>
        ) : (
          <div className="login-holder">
            <Button
              onClick={() => {
                localStorage.clear();
                router.push("/auth/login");
              }}
            >
              Logout
            </Button>
            <div>
              <p>Logged in as</p>
              <p>{user.username}</p>
            </div>
          </div>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
