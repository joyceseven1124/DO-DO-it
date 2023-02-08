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

interface DayCell {
    primary: string;
    nowTime?: boolean;
}

export const DayCell = styled.div<DayCell>`
    position: relative;
    .date_word {
        background-color: ${({ nowTime }) => {
            return nowTime
                ? 'var(--nowTimeBgColor)'
                : 'var(--otherTimeBgColor)';
        }};
        width: 30px;
        height: 30px;
        border-radius: 15px;
        line-height: 30px;
        margin: 5px auto;
        color: ${(props) => props.primary};
        cursor: pointer;
        &:hover {
            background-color: ${({ nowTime }) => {
                return nowTime
                    ? 'var(--nowTimeBgHoverColor)'
                    : 'var(--grayBgHoverColor)';
            }};
        }
    }
`;

interface Tag {
    color?: string;
    width?: string;
    top?: string;
    left?: string;
    right?: string;
}

export const Tag = styled.div<Tag>`
    box-sizing: border-box;
    background-color: var(--tagBgColor);
    width: ${(props) => props.width};
    position: absolute;
    left: ${(props) => props.left};
    right: ${(props) => props.right};
    top: ${(props) => props.top};
    text-align: left;
    padding-left: 5px;
    z-index: 5;
`;
//     pointer-events: none;
