import styled from 'styled-components';

//import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #F0F0F0;
  display: flex;
  align-items: center;
  justify-content: center;

  div.body {
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

    input {
      padding: 10px 10px;
      border-radius: 5px;
      border: none;
      font-size: 20px;
      border: none;
      background-color: #EEE;
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

  div.modal {
    position: absolute;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    background-color: #FFF;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 28px;
      margin-bottom: 40px;
      color: #606060;
    }

    input {
      padding: 10px 10px;
      border-radius: 5px;
      border: none;
      font-size: 20px;
      border: none;
      background-color: #DDD;
      width: 50%;
    }

    button {
      margin-top: 20px;
      padding: 10px 10px;
      border-radius: 5px;
      font-size: 20px;
      border: none;
      background-color: #CCC;
      width: 50%;
    }
  }
`;