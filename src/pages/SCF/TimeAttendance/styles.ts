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

  h1 {
    margin: 40px;
    color: var(--white);
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
