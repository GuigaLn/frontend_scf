import styled from 'styled-components';

import { shade } from 'polished';

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

  div {
    display: flex;
    flex-direction: column;

    border-radius: 5px;
    padding: 20px;
    text-align: center;
    margin-top: 100px;

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

