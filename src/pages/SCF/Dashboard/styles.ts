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
  width: calc(100% - 120px);
  margin-left: 120px;
  flex-direction: column;
  padding: 0px 40px;
  min-height: 100vh;

  h1 {
    font-size: 28px;
    margin-top: 40px;
    color: #1E97F7;
  }
`;