import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  background-color: #FFF;
  align-items: center;
`;

export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: calc(100% - 300px);
  flex-direction: column;

  margin-left: 300px;

  div.body {
    display: flex;
    
    flex-direction: column;
    background-color: #FFF;
    border-radius: 5px;
    padding: 20px;
    text-align: center;

    h1 {
      font-size: 28px;
      margin-bottom: 40px;
      color: #606060;
      margin-top: 100px;
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
      background-color: #DDD;

      &:hover {
        background-color: #CCC;
      }
    }
  }

  div.modal {
    position: absolute;
    
    width: calc(100% - 300px);
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
      margin-top: 100px;
    }

    input {
      padding: 10px 10px;
      border-radius: 5px;
      border: none;
      font-size: 20px;
      border: none;
      background-color: #EEE;
      width: 50%;
    }

    button {
      margin-top: 20px;
      padding: 10px 10px;
      border-radius: 5px;
      font-size: 20px;
      border: none;
      background-color: #EEE;
      width: 50%;

      &:hover {
        background-color: #DDD;
      }
    }
  }
`;

