import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  input {
      margin-bottom: 10px;
  }

  textarea {
    margin-bottom: 10px;
  }
  h2 {
    font-weight: 300;
  }

  .submit-holder {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      p {
          margin-right: 10px;
          cursor: pointer;
      }
  }
`;

const TextArea = styled.textarea`
  height: 400px;
  width: 400px;
  border-radius: 6px;
`;

export { Container, Content, TextArea };
