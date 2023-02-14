import { title } from 'process';
import React, { useEffect, useState, useRef, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { tagData } from './MonthCell';



interface Tag {
    color?: string;
    width?: string;
    top?: string;
}

const Tag = styled.div<Tag>`
    box-sizing: border-box;
    background-color: ${(props)=>props.color};
    width: ${(props) => props.width};
    height: 25px;
    line-height:25px;
    border-radius:10px;
    position: absolute;
    top: ${(props) => props.top};
    text-align: left;
    z-index: 5;
    cursor:pointer;
    font-size:20px;
    font-family:Noto Sans TC;
    font-weight:700;
    color:white;
    text-shadow: rgb(71, 71, 71) 1px 1px 0px;
    padding-left:10px;
    :active{
        cursor:grabbing;
    }
`;

function getPosition(element: any) {
    let x = 0;
    let y = 0;
    while (element) {
        x += element.offsetLeft - element.scrollLeft + element.clientLeft;
        y += element.offsetTop - element.scrollLeft + element.clientTop;
        element = element.offsetParent;
    }

    return { x: x, y: y };
}

export default function ToDoListTag(props: any) {
    const { tagStartCell } = useContext(tagData);
    const { tagEndCell } = useContext(tagData);
    const {setTagEndCell} = useContext(tagData);
    const { setTagsArray } = useContext(tagData);
    const { isTagsArray } = useContext(tagData);
    const { setShowTagIndex } =useContext(tagData);
    const { setShowListDialog } = useContext(tagData)

    let x = useContext(tagData);
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
        const title:string = e.target.firstChild.getAttribute("title")
        const startOldTag = e.target.id.split("-")[1]
        const endOldTag:number = Number(startOldTag) + Math.ceil(e.target.offsetWidth/cellSize)-1
        const insertPlace:number=clickElementPlace
        const description:string=e.target.firstChild.getAttribute("description-word")
        const allConnectWidth  = e.target.firstChild.getAttribute("connect-width")
        const color = e.target.getAttribute("color")
        const index = e.target.firstChild.getAttribute("index-time")
        e.dataTransfer.setData("startOldTag",startOldTag)
        e.dataTransfer.setData("endOldTag",endOldTag)
        e.dataTransfer.setData("color",color)
        e.dataTransfer.setData("insertPlace",insertPlace)
        e.dataTransfer.setData("title",title)
        //e.dataTransfer.setData("date","hello")
        e.dataTransfer.setData("description",description)
        e.dataTransfer.setData("allConnectWidth",allConnectWidth)
        e.dataTransfer.setData("index",index)
    }

    const dragend = (e: any) => {
    };

    let tagTop = 50
    if(props.tagOrder>1){
        tagTop = props.tagOrder*30+20
    }
    let title="(No title)"
    if(props.title){
        title = props.title
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
                title= {props.title}
                connect-width = {props.connectWidth}
                index-time = {props.index}
                description-word={props.description}
                onClick={(e)=>{
                    setShowTagIndex(props.index)
                    setShowListDialog(true)
                }}
            >
            {title}
            </div>
        </Tag>
    );
}
