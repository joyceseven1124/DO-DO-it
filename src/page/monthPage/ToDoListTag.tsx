import { Console } from 'console';
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
    background-color: var(--tagBgColor);
    width: ${(props) => props.width};
    position: absolute;
    top: ${(props) => props.top};
    text-align: left;
    z-index: 5;
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

    let x = useContext(tagData);
    let id = tagStartCell;
    /*let x = useContext(tagData)
    console.log(x)
    console.log(tagStartCell)
    let y = [...isTagsArray]
    let tag = <Tag>(No title)</Tag>
    useEffect(() => {
    // 使用瀏覽器 API 更新文件標題
    y.push(tag)
    setTagsArray(tag)
        
    },[tagStartCell]);*/
    function dragstart(e: any) {
        console.log("開始")
        const elementPosition = getPosition(e.target);
        const cellSize = document.getElementById('cell-1-1').offsetWidth;
        let clickElementPlace = (e.clientX - elementPosition.x) / cellSize;
        if (clickElementPlace < 0) {
            clickElementPlace = 1;
        } else {
            clickElementPlace = Math.ceil(clickElementPlace);
        }
        //被拖移的元素起始樣子
        //傳遞元素(width、title、description、data、color、插入的位置)
        //e.dataTransfer.setData('text/plain', 'This text   may be dragged')
        //之後要放在標籤上的東西
        const title:string = e.target.firstChild.getAttribute("title")
        const startOldTag = e.target.id.split("-")[1]
        const endOldTag:number = Number(startOldTag) + Math.ceil(e.target.offsetWidth/cellSize)-1
        const insertPlace:number=clickElementPlace
        const description:string=""
        const allConnectWidth  = e.target.firstChild.getAttribute("connect-width")
        e.dataTransfer.setData("startOldTag",startOldTag)
        e.dataTransfer.setData("endOldTag",endOldTag)
        e.dataTransfer.setData("color","red")
        e.dataTransfer.setData("insertPlace",insertPlace)
        e.dataTransfer.setData("title",title)
        e.dataTransfer.setData("date","hello")
        e.dataTransfer.setData("description","")
        e.dataTransfer.setData("allConnectWidth",allConnectWidth)

        let test = Math.ceil(e.target.offsetWidth/cellSize)*100

        //之前算點擊的位置
        /*const elementPosition = getPosition(e.target);
        const cellSize = document.getElementById('cell-1-1').offsetWidth;
        let clickElementPlace = (e.clientX - elementPosition.x) / cellSize;
        if (clickElementPlace < 0) {
            clickElementPlace = 1;
        } else {
            clickElementPlace = Math.ceil(clickElementPlace);
        }
        commonValue.insertPlace = clickElementPlace;
        //e.dataTransfer.setData('width',`${e.target.offsetWidth}px`)
        commonValue.cellWidth = `${e.target.offsetWidth}px`;*/

        //INSERT的運用
        /*if (commonValue.insertPlace !== 0) {
            id = id - (commonValue.insertPlace - 1);
            commonValue.insertPlace = 0;
        }*/

    }

    const dragend = (e: any) => {
        //拖曳刪除要放在這
        setTagEndCell(20)
    };

    let tagTop = 50
    if(props.tagOrder>1){
        tagTop = props.tagOrder*30+20
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
        >
            <div
                title=""
                connect-width = {props.connectWidth}
            >
            {props.title}
            </div>
            
        </Tag>
    );
}
