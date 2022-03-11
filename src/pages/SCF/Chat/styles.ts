import { shade } from 'polished';
import styled from 'styled-components';

import imageLogo from '../../../assets/logo.png';


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
  height: 100vh;
`;

export const ContainerChat = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  max-height: 100vh;
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

  .modalError {
    div {
      background-color: #FFF;
      padding: 20px;

      h1 {
        color: red;
      }

      p {
        margin-top: 20px;
        font-weight: 400;
        font-size: 20px;
        color: #404040;
        font-family: Arial, Helvetica, sans-serif;
      }

      p.errorId {
        font-size: 16px !important;
      }
    }
  }

  div.edit {
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