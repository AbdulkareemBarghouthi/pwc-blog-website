import React from "react";
import { Container, Content } from "./styles";
import Header from "./header";

const Layout = (props) => {
  return (
    <Container>
      <Content>
        <Header />
        {props.children}
      </Content>
    </Container>
  );
};

export default Layout;
