import styled from 'styled-components';

export const Container = styled.div`
    padding: 0 !important;

    img {
        height: 200px;
    }

    &.open {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,0.8);
        z-index: 999 !important;

        img {
            width: auto ;
            height: 80%;
        }
    }
`;