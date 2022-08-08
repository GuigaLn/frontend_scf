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

  h1 {
    margin-top: 40px;
    color: #808080;
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

  .contact-details {
    font-size: 0.9rem;
    padding: 10px 40px;
    background-color: #eee;

    p {
      margin-top: 10px;
    }

    .input-data-expanded {
      padding: 2px 10px;
      font-size: 0.9rem;
      margin-left: 20px;
    }

    .buttons-expanded {
      margin-top: 5px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      .option-button-expanded {
        padding: 10px 20px;
        background-color: #1E97F7;
        color: #FFF;
        border-radius: 10px;
        opacity: 0.8;
        cursor: pointer;
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