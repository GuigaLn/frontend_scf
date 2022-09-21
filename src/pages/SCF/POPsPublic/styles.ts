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

  h1 {
    margin: 40px;
    color: var(--text);
  }

  button.addColaborador {
    background-color: #1E97F7;
    border: none;
    color: #FFF;
    font-weight: 400;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 40px;
    margin-bottom: 40px;

    padding: 10px 0px;
    border-radius: 5px;
    width: 60%;
    transition: background 0.4s;

    &:hover {
      background-color: ${shade(0.2, '#1E97F7')};
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

    .filter-text {
      color: var(--text);
    }

    .details {
      font-size: 0.9rem;
      padding: 10px 40px;
      background-color: var(--background);
      color: var(--text);

      p {
        margin-top: 10px;
      }
    }
  }
`;