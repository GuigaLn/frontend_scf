import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #F0F0F0;
  display: flex;
  flex-direction: column;
  align-items: center;

  div.header {
    width: 100%;
    background-color: #104670;
    text-align: center;
    color: #FFF;
    padding: 20px 20px;

    p {
      font-size: 32px;
      font-weight: bold;
    }

    h1 {
      margin-top: 10px;
      font-size: 80px;
    }
  }

  div.body {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .atually {
      flex-basis: 50%;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 20px;

      span {
        font-size: 50px;
        font-weight: bold;
      }

      h2 {
        font-weight: bold;
        font-size: 220px;
      }

      p {
        font-size: 70px;
        font-weight: bold;
      }
    }

    .lasted {
      border-left: 10px solid #104670;
      flex-basis: 50%;
      background-color: #F3F3F3;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0px 20px;

      h2 {
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      div {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;

        padding: 20px 20px;

        p.senha {
          font-weight: bold;
          font-size: 50px;
        }

        p.guiche {
          font-weight: bold;
          font-size: 50px;
        }
      }
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
`;