import styled from "styled-components";

const Container = styled.div`
  padding: 0 15px;
`;

const Header = styled.div`
  width: 52%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export { Container, Header, Content };
