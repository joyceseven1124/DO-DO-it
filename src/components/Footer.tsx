import ReactDOM from 'react-dom/client';
import React from 'react';
import styled from 'styled-components';



const Wrapper = styled.div`
    background-color:var(--navBgColor);
    height:100px;
    width:100%;
    font-size:12px;
    color:white;
    display:flex;
    position:absolute;
`;

const Container = styled.div`
    width:200px;
    margin:auto auto;
    text-align:center;
    align-item:center;
    justify-content: center;
`

export default function Footer(){
    return(
        <>
            <Wrapper>
                <Container>
                    <div>DO DO it</div>
                    <div>圖片來源:pngTree</div>
                </Container>
            </Wrapper>
        </>
    )
}