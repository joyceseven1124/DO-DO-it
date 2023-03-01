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
    border-top:1px solid white
`;

const Container = styled.div`
    width:200px;
    margin:auto auto;
    text-align:center;
    align-item:center;
    letter-spacing: 1px;
    line-height:1.6;
    justify-content: center;
    font-family: 'Noto Sans';
    font-weight:200
    div{
        margin-bottom:5px;
    }
`

export default function Footer(){
    return(
        <>
            <Wrapper>
                <Container>
                    <div>DO DO it © 2023</div>
                </Container>
            </Wrapper>
        </>
    )
}