import React, { useState } from "react";
import { Container, Header, Content } from "./styles";
import { BsPlusCircleFill } from "react-icons/bs";
import BlogCard from "../blogCard/index";

const Feed = (props) => {
  const [data, setData] = useState([1, 3, 4,5]);
  return (
    <Container>
      <Header>
        <BsPlusCircleFill size={40} color={"#4a708b"} />
      </Header>
      <Content>
        {data.map((item) => (
          <BlogCard />
        ))}
      </Content>
    </Container>
  );
};

export default Feed;
