import styled from 'styled-components';

import { shade } from 'polished';

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
 
  .findForDate {
    margin-top: 40px;
    
    display: flex;
    > div {
      display: flex;
      
      input {
        border-radius: 5px;
        padding: 5px;
        border: 1px solid #808080;
      }

      div {
        margin: 5px;
      }
    }

    button {
      background-color: #1E97F7;
      border: none;
      color: #FFF;
      font-weight: 400;
      font-size: 16px;
      font-family: Arial, Helvetica, sans-serif;
      padding: 10px;
      border-radius: 5px;
      margin-left: 20px;

      transition: background 0.4s;

      &:hover {
        background-color: ${shade(0.2, '#1E97F7')};
      }
    }
  }

  .data-table-extensions-action {
    z-index: 99 !important;
  }

  div.table {
    width: 95%;
  }
  
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 11;

  div {
    background-color: #FFF;
    padding: 20px;

    p {
      font-weight: 400;
      font-size: 18px;
      color: #606060;
      font-family: Arial, Helvetica, sans-serif;
    }

    select {
      margin-top: 20px;
      border: 1px solid #808080;
      padding: 10px 20px;
      border-radius: 5px;
      width: 100%;
      background-color: #fff;
    }

    button {
      border: none;
      color: #FFF;
      font-weight: 400;
      font-size: 16px;
      font-family: Arial, Helvetica, sans-serif;
      margin-top: 20px;

      padding: 10px 0px;
      border-radius: 5px;
      width: 100%;
      transition: background 0.4s;

      &.submit {
        background-color: #1E97F7;

        &:hover {
          background-color: ${shade(0.2, '#1E97F7')};
        }
      }

      &.cancelar {
        background-color: #ff473d;

        &:hover {
          background-color: ${shade(0.2, '#ff473d')};
        }
      }
    }
  }
`;