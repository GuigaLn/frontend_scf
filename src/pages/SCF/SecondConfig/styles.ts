import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: no-wrap;
`;

export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: calc(100% - 120px);
  margin-left: 120px;
  flex-direction: column;
  padding: 0px 40px;
  min-height: 100vh;

  div {
    display: flex;
    flex-direction: column;

    border-radius: 5px;
    padding: 20px;
    text-align: center;

    h1 {
      font-size: 28px;
      font-weight: 400;
      margin-bottom: 40px;
      color: #606060;
    }

    input {
      padding: 10px 10px;
      border-radius: 3px;
      border: none;
      font-size: 20px;
      border: none;
      background-color: #FFF;
      border: 1px solid gray;
    }

    button {
      margin-top: 20px;
      padding: 10px 10px;
      border-radius: 3px;
      font-size: 20px;
      border: none;
      background-color: #DDD;

      &:hover {
        background-color: #CCC;
      }
    }
  }
`;

