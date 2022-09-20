import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: no-wrap;
  display: space-around;
  background: var(--background);

  .vacation-details {
    font-size: 0.9rem;
    padding: 10px 40px;
    background-color: #eee;

    p {
      margin-top: 10px;
    }
  }

  .rdt_TableCol {
    align-items: center !important;
    justify-content: center !important;
  }


  .rdt_TableCell {
    align-items: center !important;
    justify-content: center !important;
  }

  .icon-printer {
    font-size: 18px;
  }

`;

export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: calc(100% - 120px);
  margin-left: 120px;
  flex-direction: column;
  min-height: 100vh;

  div.header {
    width: 100%;
    display: flex;
    background-color: var(--background-button);
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      margin-top: 20px;
      margin-bottom: 20px;
      color: var(--white);
      display: flex;
      align-items: center;
    }
  }

  h2 {
    margin-top: 40px;
    color: var(--white);
  }

  div.form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .itemForm {
      flex-basis: 45%;
      
      input {
        border: 1px solid var(--border-input);
        margin-top: 5px;
        padding: 10px 20px;
        border-radius: 5px;
        width: 100%;
        color: var(--white);
        background-color: var(--background);
      }

      select {
        border: 1px solid var(--border-input);
        background-color: var(--background);
        padding: 10px 20px;
        border-radius: 2px;
        width: 100%;
        color: var(--white);
      }

      .titleInput {
        text-align: left;
        flex: 1;
        margin-top: 10px;
        color: #808080;
      }
    }
    
  }

  .editar {
    border: none;
    color: var(--white);
    font-weight: 400;
    font-size: 16px;
    margin-top: 20px;

    padding: 10px 20px;
    border-radius: 5px;
    background: var(--background-button);
    color: var(--white);
    transition: opacity 0.4s;

    &:hover {
      opacity: 0.7;
    }
  }

  hr {
    margin-top: 40px;
    width: 95%;
    height: 1px;
    border-width:0;
    background-color:gray;
  }

  .emit-vacation {
    border: none;
    color: #FFF;
    font-weight: 400;
    font-size: 16px;
    margin: 20px;

    padding: 10px 20px;
    border-radius: 5px;
    transition: background 0.4s;

    background-color: green;

    &:hover {
      background-color: ${shade(0.2, 'green')};
    }
  }

  div.table {
    width: 95%;
    background: var(--background-two);
    border-radius: 10px;

    padding: 20px;

    .rdt_TableHeadRow, .rdt_TableRow, .rdt_Pagination {
      background: var(--background-two);
      color: var(--white);
    }

    .rdt_TableRow {
      border-color: var(--border-table);
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
  z-index: 999;

  > div {
    background-color: var(--background);
    padding: 20px;

    p {
      font-weight: 400;
      font-size: 18px;
      color: var(--white);
      font-family: Arial, Helvetica, sans-serif;
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

    select {
        border: 1px solid var(--border-input);
        background-color: var(--background);
        padding: 10px 20px;
        border-radius: 2px;
        width: 100%;
        color: var(--white);
      }

    .titleInput {
      text-align: left;
      flex: 1;
      margin-top: 10px;
      color: var(--white);
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

      &.cancelar {
        background: var(--background-two);
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