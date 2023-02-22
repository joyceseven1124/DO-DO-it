import { title } from 'process';
import React, { useEffect, useState, useRef, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { commonData } from '../MonthPage';
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
    letter-spacing: 1.2px;
    text-shadow: rgb(71, 71, 71) 1px 1px 0px;
    padding-left:10px;
    :active{
        cursor:grabbing;
    }
`;

const DoneIcon = styled.span`
    margin-right: 10px;
    color: rgb(0,187,201);
    position:relative;
    :before{
        position:absolute;
        content:"";
        width:20px;
        height:20px;
        background-color: white;
        border-radius: 10px;
        z-index:-1;
        top:6px;
        -webkit-box-shadow: 7px 6px 15px 0px #070707; 
        box-shadow: 7px 6px 15px 0px #070707;
    }

`



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
    const { setTagsArray } = useContext(commonData);
    const { isTagsArray } = useContext(commonData);
    const { setShowTagIndex } =useContext(commonData);
    const { setShowListDialog } = useContext(commonData)
    

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
            {props.status==="完成" ?
            <>
                <DoneIcon>✔</DoneIcon>
            </>
                :
                null}
            
            {props.friend?
            <>
                <span style={{marginRight:"10px",color:"#08f508",
                textShadow:"rgb(71, 71, 71) 1px 1px 0px"
            }}>👩🏿‍🚀</span> 
            </>
                :
                null}
            {title}
            </div>
        </Tag>
    );
}
