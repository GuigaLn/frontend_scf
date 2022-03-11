import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: no-wrap;
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
    color: #1E97F7;
  }

  p {
    font-weight: bold;
    text-align: center;
    font-size: 1.3em;
    color: ${shade(0.2, '#1E97F7')};
    padding: 40px;
  }
`;