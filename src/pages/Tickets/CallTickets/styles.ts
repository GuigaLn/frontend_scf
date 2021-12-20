import styled from 'styled-components';

//import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #F0F0F0;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    flex-basis: 30%;
    flex-direction: column;
    background-color: #FFF;
    border-radius: 5px;
    padding: 20px;
    text-align: center;

    h1 {
      font-size: 28px;
      margin-bottom: 40px;
      color: #606060;
    }

    h2 {
      font-size: 28px;
      margin-top: 40px;
      color: #606060;
    }

    button {
      margin-top: 20px;
      padding: 10px 10px;
      border-radius: 5px;
      font-size: 20px;
      border: none;
      background-color: #CCC;
    }
  }
`;