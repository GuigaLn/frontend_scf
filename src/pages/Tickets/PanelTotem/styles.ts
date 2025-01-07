import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #EEE;
  margin: 0px;

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 10px 10px;
    text-align: center;
    align-items: center;
    justify-content: center;

    img {
      width: 200px;
    }

    h1 {
      font-size: 28px;
      margin: 40px;
    }

    input {
      padding: 10px 10px;
      border-radius: 5px;
      font-size: 20px;
      background-color: #EEE;
    }

    button {
      max-width: 500px;
      margin-top: 20px;
      padding: 40px 10px;
      border-radius: 5px;
      font-size: 20px;
      border: none;
      width: 100%;
      transition: opacity 0.4s;
      font-weight: bold;
      font-size: 40px;

      background-color: #1E97F7;
      color: #FFF;

      &.priority {
        margin-bottom: 40px;
        background-color:rgb(209, 50, 50);
      }

      &:hover {
        opacity: 0.8;
      }

      &:disabled {
        opacity: 0.4;
      }
    }
  }
`;