import styled from 'styled-components';

import { shade } from 'polished';

export const SideBar = styled.div`
  background-color: #F7F9FC;
  height: 100%;
  width: 300px;
  padding: 20px;
  position: fixed;
  z-index: 10;

  div.header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 20%;
    }

    strong {
      font-family: Arial, Helvetica, sans-serif;
      color: #606060;
    }
  }

  
  div.body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    

    button {
      background-color: #1E97F7;
      border: none;
      color: #FFF;
      font-weight: 400;
      font-size: 18px;
      font-family: Arial, Helvetica, sans-serif;
      margin-top: 40px;
      margin-bottom: 40px;
      padding: 10px 0px;
      border-radius: 5px;
      width: 100%;
      transition: background 0.4s;

      &:hover {
        background-color: ${shade(0.2, '#1E97F7')};
      }
    }

    div.option {
      font-weight: 400;
      font-size: 18px;
      
      margin-top: 10px;
      padding: 10px 10px;
      border-radius: 5px;
      width: 100%;
      color: #808080;
      cursor: pointer;

      display: flex;
      transition: color 0.2s;

      span {
        margin-left: 10px;
        font-family: Arial, Helvetica, sans-serif;
      }

      &.select {
        color: #1E97F7;
        background-color: #E8EDF3;
      }

      &:hover {
        color: #1E97F7;
      }
    }

  }
`;
