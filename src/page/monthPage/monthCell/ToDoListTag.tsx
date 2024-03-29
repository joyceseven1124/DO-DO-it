import React, { useContext } from 'react';
import styled from 'styled-components';
import { commonData } from '../../MonthPage';
import { tagData } from '../MonthCell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

interface Tag {
    color?: string;
    width?: string;
    top?: string;
}

const Tag = styled.div<Tag>`
    box-sizing: border-box;
    background-color: ${(props) => props.color};
    width: ${(props) => props.width};
    height: 25px;
    line-height: 25px;
    border-radius: 5px;
    position: absolute;
    top: ${(props) => props.top};
    text-align: left;
    z-index: 5;
    cursor: pointer;
    font-size: 14px;
    font-family: Noto Sans TC;
    font-weight: 400;
    color: white;
    letter-spacing: 1.2px;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
    padding-left: 10px;
    :active {
        cursor: grabbing;
    }
    :hover {
        background: ${(props) => props.color};
        color: #fff;
        box-shadow: 0 0 1px ${(props) => props.color},
                    0 0 1px ${(props) => props.color},
                    0 0 10px ${(props) => props.color},
                    0 0 20px ${(props) => props.color};
    }

    @media screen and (max-width: 1200px) {
        overflow: hidden;
    }
`;

const DoneIcon = styled.span`
    margin-right: 10px;
    color: rgb(0, 91, 97);
    position: relative;
`;

function getPosition(e:any){
    let x = 0;
    let y = 0;
    while (e) {
        x += e.offsetLeft - e.scrollLeft + e.clientLeft;
        y += e.offsetTop - e.scrollLeft + e.clientTop;
        e = e.offsetParent;
    }

    return { x: x, y: y };
}

interface TagStyleData{
    key:string
    id:string
    title:string
    width:string
    connectWidth:number
    tagOrder:number
    color:string
    index:string
    description:string
    status:string
}

export default function ToDoListTag(props: TagStyleData) {
    const { tagStartCell } = useContext(tagData);
    const { setShowTagIndex } = useContext(commonData);
    const { setShowListDialog } = useContext(commonData);

    let id = tagStartCell;
    function dragstart(e: any) {
        const elementPosition = getPosition(e.target);
        const cellSize = document.getElementById('cell-1-1').offsetWidth;
        let clickElementPlace = (e.clientX - elementPosition.x) / cellSize;
        if (clickElementPlace < 0) {
            clickElementPlace = 1;
        } else {
            clickElementPlace = Math.ceil(clickElementPlace);
        }
        const startOldTag = e.target.id.split('-')[1];
        const endOldTag: number =
            Number(startOldTag) +
            Math.ceil(e.target.offsetWidth / cellSize) -
            1;
        const insertPlace: number = clickElementPlace;
        const allConnectWidth =
            e.target.firstChild.getAttribute('connect-width');
        const index = e.target.firstChild.getAttribute('index-time');
        e.dataTransfer.setData('startOldTag', startOldTag);
        e.dataTransfer.setData('endOldTag', endOldTag);
        e.dataTransfer.setData('insertPlace', insertPlace);
        e.dataTransfer.setData('allConnectWidth', allConnectWidth);
        e.dataTransfer.setData('index', index);
    }

    const dragend = () => {};

    let tagTop = 30;
    if (props.tagOrder > 1) {
        tagTop = props.tagOrder * 30;
    }
    let title = '(No title)';
    if (props.title) {
        title = props.title;
    }
    return (
        <Tag
            id={props.id}
            className={`toDoListTag-${props.id}`}
            key={`tag-${props.id}`}
            onDragStart={dragstart}
            onDragEnd={dragend}
            draggable="true"
            width={props.width}
            top={`${tagTop}px`}
            color={props.color}
        >
            <div
                title={"drag it or click it"}
                connect-width={props.connectWidth}
                index-time={props.index}
                description-word={props.description}
                onClick={(e) => {
                    setShowTagIndex(props.index);
                    setShowListDialog(true);
                }}
            >
                {props.status === '完成' ? (
                    <>
                        <DoneIcon>
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </DoneIcon>
                    </>
                ) : null}
                {title}
            </div>
        </Tag>
    );
}
