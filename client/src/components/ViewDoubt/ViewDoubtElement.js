import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    border:2px solid black;
    height: 100%;
    @media (max-width: 1000px) {
        flex-direction: column;
    }
`

export const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    border:2px solid black;
`