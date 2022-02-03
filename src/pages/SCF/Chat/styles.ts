import { shade } from 'polished';
import styled from 'styled-components';

import imageLogo from '../../../assets/logo.png';


export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: space-around;
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
  height: 100%;
`;

export const ContainerChat = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  max-height: 100vh;
`;

export const Contacts = styled.div`
  background-color: #F0F0F0;
  flex-basis: 30%;
  height: 100%;
  text-align: center;

  padding: 0px 0px;
  
  border-right: 1px solid rgba(0,0,0,0.2);
  overflow-y: auto;
`;

export const Contact = styled.div`
  display: flex;
  align-items: left;
  padding: 10px 15px;
  flex-wrap: wrap;
  text-align: left;

  border-bottom: 1px solid rgba(0,0,0,0.1);

  transition: background-color 0.3s;
  transition: opacity 0.3s;

  &:hover {
    background-color: #E0E0E0;
  }

  &.activeChat {
    opacity: 0.9;
    color: black;
    background-color: #1E97F7;

    p {
      color: #000;
    }
  }
`; 

export const ContactInformation = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  div {
    flex-basis: 80%;

    strong {
      color: #000;
      font-size: 14px;
    }

    p {
      margin-top: 5px;
      color: #606060;
      font-weight: bold;
      font-size: 12px;
    }
  }

  span {
    height: 100%;
    border: 2px solid #1E97F7;
    border-radius: 10px;
  }
`; 

export const Menssagens = styled.div`
  background-image: url(${imageLogo});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;

  flex-basis: 79%;
  height: 100%;


  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  .header-message {
    background: #F0F0F0;
    padding: 10px 5px;
    justify-content: space-between;
    display: flex;
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 99;

    .button-send-anexo {
      margin-right: 20px;
      color: #606060;
      cursor: pointer;

      transition: 1s;

      &:hover {
        color: #1E97F7;
      }
    }

    .buttons {

      .button-item {
        margin-left: 20px;
        color: #606060;
        cursor: pointer;

        transition: 1s;

        &:hover {
          color: #1E97F7;
        }
      }
    }
  }

  div.container {
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  .sendMessage {
    bottom: 0;
    width: 100%;
    padding: 10px 5px;
    background: #F0F0F0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
      width: 100%;
      font-size: 18px;
      padding: 5px 20px;
      border: 1px solid #808080;
      border-radius: 5px;
    }

    .button-send {
      cursor: pointer;
      margin-left: 20px;
      margin-right: 20px;
      color: #606060;

      transition: 1s;

      &:hover {
        color: #1E97F7;
      }
    }
  }
`;

export const ItemMessage = styled.div`

  display: flex;
  padding: 20px;
  width: 100%;

  div {
    flex-basis: 40%;
    background: #F0F0F0;
    display: flex;
    flex-direction: column;

    box-shadow: 0px 0px 1px #333;
    border-radius: 5px;
    padding: 10px 20px;
    position: relative;
    scroll-margin-bottom: 0;
  }
  
  &.right {
    justify-content: flex-end;
    text-align: left;
  }

  &.left {
    justify-content: flex-start;
    text-align: left;
  }

  strong {
    font-size: 14px;
    font-weight: 400;
  }

  span {
    margin-top: 5px;
    text-align: right;
    font-size: 13px;
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