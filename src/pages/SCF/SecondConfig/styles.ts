import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: no-wrap;
  background: var(--background);
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

  div {
    display: flex;
    flex-direction: column;

    border-radius: 5px;
    padding: 20px;
    text-align: center;

    h1 {
      font-size: 28px;
      font-weight: 400;
      margin-bottom: 40px;
      color: var(--text);
    }

    input {
      padding: 10px 10px;
      border-radius: 3px;
      border: none;
      font-size: 20px;
      border: none;
      background-color: #FFF;
      border: 1px solid gray;
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
        background: var(--background-button);
        color: var(--white);
        transition: opacity 0.4s;

        &:hover {
          opacity: 0.7;
        }
      }

      &.excluir {
        background: var(--background-two);
        color: var(--white);
        transition: opacity 0.4s;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
`;

