import styled from 'styled-components';

import { shade } from 'polished';

export const Form = styled.form`
  height: 100vh;
  display: flex;
  align-items: center;
  margin: 0 auto;

  div {
    max-width: 550px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    
    justify-content: center;
    flex-direction: column;

    animation: 1s;

    strong {
      font-weight: 800;
      font-size: 48px;
      line-height: 87px;
      text-align: center;
      
      color: #505050;
    }

    p {
      font-size: 18px;
      line-height: 30px;
      text-align: center;
      
      color: #606060;
    }

    div.header {
      margin-top: 20px;
      width: 100%;

      label {
        font-weight: 600;
        margin-top: 20px;
        font-size: 16px;
        line-height: 22px;
        color: #848484;

        text-align: left;
      }

      input {
        background: #F0EFF4;
        border: 1px solid #F0EFF4;
        box-sizing: border-box;
        border-radius: 10px;

        padding: 15px 20px;
        transition: border-color 1s;

        &::placeholder {
          font-size: 18px;

          color: #A9A9A9;
        }

        &:hover {
          border-color: #AAA;
        }

        &:focus {
          border-color: #3CDC8C;
        }

      }
    }

    div.buttons {
      margin-top: 30px;

      div {
        width: 70%;
        background: #1E97F7;

        border-radius: 5PX;
        border: 0;
        margin: 0 auto;
        padding: 10px;
        text-align: center;

        font-weight: 600;
        font-size: 18px;
        color: #FFFFFF;
        transition: background 0.4s;

        &:hover{
          background: ${shade(0.2, '#1E97F7')}
        }
      }
    }
  }


`;