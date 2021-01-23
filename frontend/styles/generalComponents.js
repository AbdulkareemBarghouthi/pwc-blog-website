import styled from "styled-components";

const DimBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 400px;
  height: 52px;
  border: solid 1px rgba(0,0,0,0.4);
  border-radius: 6px;
`;


const Button = styled.button`
    width: 109px;
    height: 43px;
    background-color: ${props => props.color? props.color: "#8cbed6"};
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
`;

const LoginCard = styled.div`
  min-height: 430px;
  width: 490px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 2px 1px 9px 1px #fff;
  padding: 10px;

  .role-radio-group{
    margin-top: 15px;
    align-self: flex-start;
    margin-left: 44px;
  }

  .warning{
    text-align: center;
    color: red;
  }
  h2 {
    text-align: center;
  }

    .body {
      display: flex;
      flex-direction: column;
      align-items: center;

      .login-button {
          margin-top: 10px;
          align-self: flex-end;
          margin-right: 44px;
      }
  }
`;


export { DimBackground, Input, Button, LoginCard };
