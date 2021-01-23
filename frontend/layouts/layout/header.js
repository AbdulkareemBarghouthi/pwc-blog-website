import React, { useState } from "react";
import { HeaderContainer } from "./styles";
import { Button } from "../../styles/generalComponents";

const Header = (props) => {
  const [user, setUser] = useState(null);

  return (
    <HeaderContainer>
      <img src="https://180dc.org/wp-content/uploads/2015/10/pwc-logo.png" />

      <div className="user-holder">
        {!user ? (
          <div className="button-holder">
            <Button color={"#98f5ff"}>Login</Button>
            Or
            <Button color={"#4a708b"}>Register</Button>
          </div>
        ) : (
          <>
            <p>Logged in as</p>
            <p>Abdulkareem Barghouthi</p>
          </>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
