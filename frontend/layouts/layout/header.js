import React, { useEffect, useState } from "react";
import { HeaderContainer } from "./styles";
import { Button } from "../../styles/generalComponents";
import {useRouter} from 'next/router';
import {getUser} from '../../helpers/auth';

const Header = (props) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(()=>{
    setUser(getUser().data);
  },[])
  return (
    <HeaderContainer>
      <img src="https://180dc.org/wp-content/uploads/2015/10/pwc-logo.png" />

      <div className="user-holder">
        {!user ? (
          <div className="button-holder">
            <Button onClick={()=>{
              router.push('/auth/login');
            }} color={"#98f5ff"}>Login</Button>
            Or
            <Button onClick={()=>{
              router.push('/auth/register');
            }} color={"#4a708b"}>Register</Button>
          </div>
        ) : (
          <>
            <p>Logged in as</p>
            <p>{user.username}</p>
          </>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
