import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--background);
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    flex-basis: 30%;
    flex-direction: column;
    background: var(--background-two);
    border-radius: 5px;
    padding: 20px;
    text-align: center;

    h1 {
      font-size: 28px;
      margin-bottom: 40px;
      color: var(--text);
    }

    input {
      padding: 10px 10px;
      border-radius: 5px;
      border: none;
      font-size: 20px;
      border: none;
      background-color: #EEE;
    }

    button {
      margin-top: 20px;
      padding: 10px 10px;
      border-radius: 5px;
      font-size: 20px;
      border: none;
      background: var(--background);
      color: var(--text);
      transition: background 0.4s;

      &:hover {
        background: var(--background-button);
      }
    }
  }
`;