import styled from 'styled-components';

/*const Input = styled.input.attrs(({ type }) => ({
  type:  type || "password"
}))`
  align-items: center;
  display: flex;
  margin: 1.5vh 0;
`*/

/*export const Test = styled.div<{ menuOpen: boolean }>`
    ${({ menuOpen }) => {
    if (menuOpen) {
      return 'background-color: white';
    }

    return 'background-color: black';
  }}
`;*/

export const DayCell = styled.div<{ primary: boolean }>`
    color: ${({ primary }) => {
        return primary ? 'black' : '#8a8a8a';
    }};
    position:relative;
`;

interface Tag {
  color?: string;
  width?: string;
  top?: string;
  left?:string;
  right?:string;
}


export const Tag = styled.div<Tag>`
    box-sizing:border-box;
    background-color:yellow;
    width:${(props) => props.width};
    position:absolute;
    left:${(props)=>props.left};
    right:${(props)=>props.right};
    top:${(props)=>props.top};
    text-align:left;
    padding-left:5px;
    z-index:5;
`;
