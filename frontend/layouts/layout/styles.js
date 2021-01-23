import styled from "styled-components";

const Container = styled.div`
  display: inline-flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  background-color: #eef0f1;
`;

const Content = styled.div`
  width: 1365px;
  overflow-x: hidden;
  overflow-y: auto;

  
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;

  img {
    width: 100px;
    cursor: pointer;
  }

  .user-holder {
      width: 250px;
      .button-holder {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
  }

  .login-holder {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: space-evenly;
  }

  .admin-message {
    color: coral;
    text-align: center;
  }
`;

export { Container, Content, HeaderContainer };
