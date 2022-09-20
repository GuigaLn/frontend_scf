import styled from 'styled-components';

import { shade } from 'polished';

export const Form = styled.form`
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;

  div.banner {
    flex: 1;
    height: 100%;
    background-image: url("./banner.png");
  }

  div.form {
    flex-basis: 35%;
    height: 100%;

    width: 100%;
    margin: 0 auto;
    display: flex;
    background: var(--background);
    justify-content: center;
    flex-direction: column;
    padding: 10px 40px;

    animation: 1s;

    strong {
      font-weight: 800;
      font-size: 48px;
      line-height: 87px;
      text-align: center;
      
      color: var(--background-button);
    }

    p {
      font-size: 18px;
      line-height: 30px;
      text-align: center;
      
      color: var(--text);
    }

    div.header {
      margin-top: 20px;
      width: 100%;
      display: flex;
      flex-direction: column;

      label {
        font-weight: 600;
        margin-top: 20px;
        font-size: 16px;
        line-height: 22px;
        color: var(--text);

        text-align: left;
      }

      input {
        border: 1px solid var(--border-input);
        margin-top: 5px;
        padding: 10px 20px;
        border-radius: 5px;
        width: 100%;
        color: var(--white);
        background-color: var(--background);
      }
    }

    div.buttons {
      margin-top: 30px;

      div {
        width: 70%;
        background: var(--background-button);
        cursor: pointer;

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

    @media(max-width: 950px) {
      flex-basis: 100%;

      label {
        margin: 0 auto;
      }

      input {
        margin: 0 auto;
        max-width: 250px;
      }
    }
  }
`;