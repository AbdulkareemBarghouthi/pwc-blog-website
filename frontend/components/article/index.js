import React from "react";
import BlogCard from "../blogCard/index";
import { Container, Header } from "./styles";
import { FiEdit, FiSave } from 'react-icons/fi';
import { TiCancel } from 'react-icons/ti';

const Article = (props) => {
  return (
    <Container>
      <Header>
        <TiCancel size={30}/>
        <FiSave size={30}/>
        <FiEdit size={30}/>
      </Header>
      <BlogCard type="article" />
    </Container>
  );
};

export default Article;
