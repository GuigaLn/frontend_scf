import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: no-wrap;
  background: var(--white);
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
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;

    min-height: 50vh;

    border-radius: 5px;
    width: 100%;
    max-width: 1000px;
    padding: 20px;
    text-align: center;
    background-color: #FFF;

    .rdw-editor-wrapper {
      border: 1px solid #BBB;
    }

    .form {
      margin: 20px 0px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
     
      gap: 10px;

      .small-width {
        flex-basis: 30%;
      }

      > div {
        flex-basis: 30%;
        display: flex;
        flex-direction: column;

        label {
          margin: 5px;
          font-size: 0.9rem;
        }

        input {
          padding: 5px 10px;
          border: 1px solid #AAA;
        }
      }
    }

    .button {
      display: flex;

      justify-content: flex-end;

      button {
        margin-top: 20px;
        padding: 10px 20px;
        background-color: var(--background-button);
        border: none;
        border-radius: 10px;
        color: var(--white);
        font-size: 1rem;
        font-weight: bold;
        transition: opacity 0.4s;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
`;

