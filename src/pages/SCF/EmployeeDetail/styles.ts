import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: no-wrap;
  display: space-around;

  .rdt_TableCol {
    align-items: center !important;
    justify-content: center !important;
  }


  .rdt_TableCell {
    align-items: center !important;
    justify-content: center !important;
  }

  .icon-printer {
    font-size: 18px;
  }

`;

export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: calc(100% - 120px);
  margin-left: 120px;
  flex-direction: column;
  min-height: 100vh;

  div.header {
    width: 100%;
    display: flex;
    background-color: #1E97F7;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      margin-top: 20px;
      margin-bottom: 20px;
      color: #FFF;
      display: flex;
      align-items: center;
    }
  }

  h2 {
    margin-top: 40px;
    color: #606060
  }

  div.form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .itemForm {
      flex-basis: 45%;
      
      input {
        border: 1px solid #808080;
        padding: 10px 20px;
        border-radius: 2px;
        width: 100%;
        color: #808080;
      }

      select {
        border: 1px solid #808080;
        background-color: #fff;
        padding: 10px 20px;
        border-radius: 2px;
        width: 100%;
        color: #808080;
      }

      .titleInput {
        text-align: left;
        flex: 1;
        margin-top: 10px;
        color: #808080;
      }
    }
    
  }

  .editar {
    border: none;
    color: #FFF;
    font-weight: 400;
    font-size: 16px;
    margin-top: 20px;

    padding: 10px 20px;
    border-radius: 5px;
    transition: background 0.4s;

    background-color: #1E97F7;

    &:hover {
      background-color: ${shade(0.2, '#1E97F7')};
    }
  }

  hr {
    margin-top: 40px;
    width: 95%;
    height: 1px;
    border-width:0;
    background-color:gray;
  }

  .emit-vacation {
    border: none;
    color: #FFF;
    font-weight: 400;
    font-size: 16px;
    margin-top: 20px;

    padding: 10px 20px;
    border-radius: 5px;
    transition: background 0.4s;

    background-color: green;

    &:hover {
      background-color: ${shade(0.2, 'green')};
    }
  }

  div.table {
    width: 100%;
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
  z-index: 999;

  > div {
    background-color: #FFF;
    padding: 20px;

    p {
      font-weight: 400;
      font-size: 18px;
      color: #606060;
      font-family: Arial, Helvetica, sans-serif;
    }

    select {
      border: 1px solid #808080;
      background-color: #FFF;
      padding: 10px 20px;
      border-radius: 5px;
      width: 100%;
      color: #808080;
    }

    input {
      border: 1px solid #808080;
      padding: 10px 20px;
      border-radius: 5px;
      width: 100%;
      color: #808080;
    }

    .titleInput {
      text-align: left;
      flex: 1;
      margin-top: 10px;
      color: #808080;
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

      &.editar {
        background-color: #1E97F7;

        &:hover {
          background-color: ${shade(0.2, '#1E97F7')};
        }
      }

      &.cancelar {
        border: 1px solid #ff473d;
        color: #ff473d;

        &:hover {
          border-color: ${shade(0.2, '#ff473d')};
        }
      }

      &.excluir {
        background-color: #ff473d;

        &:hover {
          background-color: ${shade(0.2, '#ff473d')};
        }
      }
    }
  }
`;