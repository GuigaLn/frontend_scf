import styled from 'styled-components';

//import imageLogo from '../../assets/logo.png';

export const Menssagens = styled.div`
  background-image: url("https://personalmarketingdigital.com.br/wp-content/uploads/2018/05/background-whatsapp-7.jpg");
  background-size: cover;

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

    #loaderMoreMessage {
      cursor: pointer;
    }
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