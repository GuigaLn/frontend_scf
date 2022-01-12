import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;

  background-color: #FFF;
  display: space-around;
  align-items: center;
`;

export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: calc(100% - 300px);
  flex-direction: column;
  margin-left: 300px;

  h1 {
    margin-top: 40px;
    color: #808080;
  }

  div.table {
    width: 60%;
  }
`;
