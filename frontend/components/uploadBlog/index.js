import React from "react";
import { Container, Content, TextArea } from "./styles";
import { Input, Button } from "../../styles/generalComponents";

const UploadBlog = (props) => {
  return (
    <Container>
      <Content>
        <h2>Upload a blog</h2>
        <Input placeholder="What's your title?"/>
        <TextArea placeholder="Add Your content here"/>
        <span className="submit-holder">
          <p>
            <a href="#">Cancel</a> or
          </p>
          <Button>Submit</Button>
        </span>
      </Content>
    </Container>
  );
};

export default UploadBlog;
