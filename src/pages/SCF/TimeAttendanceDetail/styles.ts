import styled from 'styled-components';

import { shade } from 'polished';

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

  .input_time {
    font-size: 12px;
    border: none;
    width: 40;
  }
 
  .findForDate {
    margin-top: 40px;
    color: var(--text);
    margin-bottom: 20px;
    
    display: flex;
    > div {
      display: flex;
      
      input {
        border: 1px solid var(--border-input);
        margin-top: 5px;
        padding: 10px 20px;
        border-radius: 5px;

        color: var(--white);
        background-color: var(--background);
      }

      div {
        margin: 5px;
      }
    }
  }

  .addExtraHour, .loadingData {
    background-color: var(--background-button);
    border: none;
    color: var(--white);
    font-weight: 400;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 10px;
    border-radius: 5px;
    margin-left: 20px;
  

    transition: background 0.4s;

    &:hover {
      background-color: ${shade(0.2, '#1E97F7')};
    }

    &.addExtraHour {
      margin: 20px 0;
    }
  }

  .data-table-extensions-action {
    z-index: 99 !important;
  }

  div.table {
    width: 95%;
    background: var(--background-two);
    border-radius: 10px;

    padding: 20px;

    .rdt_TableHeader {
      background-color: transparent;
      color: var(--text);
    }

    .rdt_TableHeadRow, .rdt_TableRow, .rdt_Pagination {
      background: var(--background-two);
      color: var(--white);
    }

    .rdt_TableRow {
      border-color: var(--border-table);
    }

    input {
      border: 1px solid var(--border-input);
      margin-top: 5px;
      padding: 5px 0px;
      border-radius: 5px;
      color: var(--white);
      background-color: var(--background);
    }
  }
  
  h3 {
    margin-top: 20px;
    color: var(--white);
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