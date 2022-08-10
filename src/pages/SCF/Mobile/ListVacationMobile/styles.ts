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
  width: 100%;
  flex-direction: column;
  padding: 0px 40px;
  min-height: 100vh;

  h1 {
    margin-top: 40px;
    color: #808080;
    text-align: center;
    font-size: 1.2rem;
  }

  button.addColaborador {
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
    width: 60%;
    transition: background 0.4s;

    &:hover {
      background-color: ${shade(0.2, '#1E97F7')};
    }
  }

  div.table {
    width: 100%;
  }

  .vacation-details {
    font-size: 0.9rem;
    padding: 10px 40px;
    background-color: #eee;

    p {
      margin-top: 10px;
    }
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

    input {
      border: 1px solid #808080;
      padding: 10px 20px;
      border-radius: 5px;
      width: 100%;
  
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