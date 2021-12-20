import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #FFF;
  display: flex;
  align-items: center;
`;

export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  margin-left: 300px;
  padding: 0px 40px;

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