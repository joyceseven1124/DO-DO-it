import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Tag } from './actionStyle';

let tagPathData: { [key: string]: string }[] = [];

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

function checkElementIntersect(e: any) {
    const id = Number(e.target.id.split('-')[1]);
    const row = Number(e.target.id.split('-')[2]);
    let positionTop: string = 'auto';
    let intersectNumber = 0;

    const check = (element: any) => {
        const cellSize = document.getElementById('cell-1-1').offsetWidth;
        const tagWidth = (element as HTMLElement).offsetWidth;
        const elementId = Number(element.id.split('-')[1]);
        if (tagWidth > cellSize) {
            const position = getPosition(element).x;
            const elementRightPlace = Math.floor(
                (position + tagWidth) / cellSize
            );
            let targetPlace = getPosition(e.target).x;
            targetPlace = Math.ceil(targetPlace / cellSize);
            if (targetPlace <= elementRightPlace) {
                return true;
            }
        } else if (id === elementId) {
            return true;
        }
    };

    for (let i = row * 7 - 6; i <= row * 7; i++) {
        const sameRowTagOne = document.querySelector(`#toDoListTag-${i}-0`);
        const sameRowTagTwo = document.querySelector(`#toDoListTag-${i}-1`);
        const sameRowTagThree = document.querySelector(`#toDoListTag-${i}-2`);
        if (sameRowTagOne !== null) {
            const result = check(sameRowTagOne);
            if (result) {
                intersectNumber++;
            }
        }

        if (sameRowTagTwo !== null) {
            const result = check(sameRowTagTwo);
            if (result) {
                intersectNumber++;
            }
        }

        if (sameRowTagThree !== null) {
            const result = check(sameRowTagThree);
            if (result) {
                intersectNumber++;
            }
        }
    }

    if (intersectNumber === 0) {
        positionTop = 'auto';
    } else if (intersectNumber === 1) {
        positionTop = '80px';
    } else if (intersectNumber === 2) {
        positionTop = '100px';
    }
    return { positionTop: positionTop, intersectNumber: intersectNumber };
}

interface commonValue {
    startCell: number;
    endCell: number;
    cellWidth: string;
    dragging: boolean;
    changeRowStatus: boolean;
    insertPlace: number;
    startRow: number;
    endRow: number;
    positionLeft: string;
    positionRight: string;
    firstTagIs: string;
    nowTagIs: string;
    rowsTags: string[];
    changeEndTagId: number;
}

//用useState代替，須歸零的部分或重新計算
let commonValue: commonValue = {
    startCell: 0,
    endCell: 0,
    cellWidth: '100%',
    dragging: false,
    changeRowStatus: false,
    insertPlace: 0,
    startRow: 0,
    endRow: 0,
    positionLeft: 'auto',
    positionRight: 'auto',
    firstTagIs: '',
    nowTagIs: '',
    rowsTags: [],
    changeEndTagId: 0,
};

//let positionTop:string="auto"

function mouseDown(e: any) {
    if (!e.target.className.includes('toDoListTag')) {
        commonValue.startCell = Number(e.target.id.split('-')[1]);
        commonValue.startRow = Number(e.target.id.split('-')[2]);
        draw(e);
        const monthCellArray = Array.from(
            document.getElementsByClassName('date')
        );
        monthCellArray.forEach((element) => {
            element.addEventListener('pointerenter', changeTagWidth);
        });
    }
}

function changeTagWidth(e: any) {
    //目前的位置
    let startPlaceTag = document.getElementById(commonValue.nowTagIs);
    commonValue.endCell = Number(e.target.id.split('-')[1]);
    commonValue.endRow = Number(e.target.id.split('-')[2]);
    if (commonValue.endRow !== commonValue.startRow) {
        let id = commonValue.changeEndTagId;
        const perRowStartNumber = [1, 8, 15, 22, 29, 36];
        const perRowEndNumber = [7, 14, 21, 28, 35, 42];
        //換行折返
        const pathNumber = commonValue.rowsTags.length;
        console.log('我再找邏輯');
        console.log(pathNumber);
        console.log(Math.abs(commonValue.endRow - commonValue.startRow));
        //依序擺入判斷是中
        //commonValue.endRow > pathNumber
        //commonValue.endRow === pathNumber
        if (commonValue.endRow > pathNumber) {
            //用useState代替
            commonValue.changeRowStatus = true;
            if (commonValue.startRow > commonValue.endRow) {
                if (perRowStartNumber.includes(id)) {
                    id = id + 6;
                    commonValue.positionRight = '1%';
                    commonValue.cellWidth = '700%';
                } else if (perRowEndNumber.includes(id)) {
                    commonValue.cellWidth = '100%';
                    startPlaceTag.style.right = '1%';
                    startPlaceTag.style.width = '700%';
                } else {
                    const firstRowWidth =
                        (Math.abs(
                            commonValue.startCell -
                                (commonValue.startRow * 7 - 6)
                        ) +
                            1) *
                        100;
                    startPlaceTag.style.right = '1%';
                    startPlaceTag.style.width = `${firstRowWidth}%`;
                    const SecondRowWidth =
                        (Math.abs(
                            commonValue.endCell - commonValue.endRow * 7
                        ) +
                            1) *
                        100;
                    id = commonValue.endRow * 7;
                    commonValue.positionRight = '1%';
                    commonValue.cellWidth = `${SecondRowWidth}%`;
                }
            } else if (commonValue.startRow < commonValue.endRow) {
                if (perRowStartNumber.includes(id)) {
                    startPlaceTag.style.width = '700%';
                    const SecondRowWidth =
                        (Math.abs(
                            commonValue.endCell - (commonValue.endRow * 7 - 6)
                        ) +
                            1) *
                        100;
                    commonValue.cellWidth = `${SecondRowWidth}%`;
                    commonValue.positionLeft = '1%';
                } else if (perRowEndNumber.includes(id)) {
                    id = id - 6;
                    commonValue.cellWidth = '700%';
                    commonValue.positionLeft = '1%';
                } else {
                    const firstRowWidth =
                        (Math.abs(
                            commonValue.startCell - commonValue.startRow * 7
                        ) +
                            1) *
                        100;
                    startPlaceTag.style.width = `${firstRowWidth}%`;
                    const SecondRowWidth =
                        (Math.abs(
                            commonValue.endCell - (commonValue.endRow * 7 - 6)
                        ) +
                            1) *
                        100;
                    id = commonValue.endRow * 7 - 6;
                    commonValue.cellWidth = `${SecondRowWidth}%`;
                    commonValue.positionLeft = '1%';
                }
            }
            commonValue.changeEndTagId = id;
            draw(e);
            commonValue.changeEndTagId = 0;
        } else if (commonValue.endRow === pathNumber) {
            const nowTagId = commonValue.rowsTags[pathNumber - 1];
            startPlaceTag = document.getElementById(nowTagId);
            console.log('現在的tag是誰');
            console.log(startPlaceTag);
            const differentRowStartCell = Number(nowTagId.split('-')[1]);
            const tagWidth: number =
                (Math.abs(differentRowStartCell - commonValue.endCell) + 1) *
                100;
            startPlaceTag.style.width = `${tagWidth}%`;
        } else {
            const id = Number(
                commonValue.rowsTags[pathNumber - 1].split('-')[1]
            );
            const deleteTagId = commonValue.rowsTags[pathNumber - 1];
            const deleteInCellId = `cell-${id}-${Math.ceil(id / 7)}`;
            const deleteInCell = document.getElementById(deleteInCellId);
            const deleteTag = document.getElementById(deleteTagId).parentNode;
            deleteInCell.removeChild(deleteTag);
            commonValue.rowsTags.pop();
            const nowTagIndex = commonValue.rowsTags.length - 1;
            console.log('現在的tag是誰');
            console.log(nowTagIndex);
            startPlaceTag = document.getElementById(
                commonValue.rowsTags[nowTagIndex]
            );
        }
    } else {
        console.log('我在這');
        const tagWidth: number =
            (Math.abs(commonValue.startCell - commonValue.endCell) + 1) * 100;
        startPlaceTag.style.width = `${tagWidth}%`;
    }

    if (commonValue.startCell > commonValue.endCell) {
        startPlaceTag.style.right = '1%';
    } else if (commonValue.startCell === commonValue.endCell) {
        startPlaceTag.style.left = 'auto';
        startPlaceTag.style.right = 'auto';
    } else {
        startPlaceTag.style.left = '1%';
    }
    let checkResultIntersect = checkElementIntersect(e);
    if (checkResultIntersect.intersectNumber > 0) {
        startPlaceTag.style.top = checkResultIntersect.positionTop;
    }
}

function mouseUp(e: any) {
    const monthCellArray = Array.from(document.getElementsByClassName('date'));
    monthCellArray.forEach((element) => {
        element.removeEventListener('pointerenter', changeTagWidth);
    });
    if (e.target.classList.contains('date')) {
        //可以用usestate代替
        const dialogBox = document.getElementById('toDoListDialogBox');
        dialogBox.style.display = 'flex';
        //dialogBox.setAttribute("className",`${commonValue.startCell}`)
        setTimeout(function () {
            document.getElementById('toDoListTitle').focus();
        }, 0);

        let id = Number(e.target.id.split('-')[1]);
        commonValue.rowsTags.forEach((element) => {
            //const startPlaceTag = document.querySelector<HTMLElement>(`.toDoListTag-${commonValue.startCell}`);
            const startPlaceTag = document.getElementById(element);
            startPlaceTag.style.pointerEvents = 'auto';
        });
        if (commonValue.changeRowStatus) {
            const totalDay = Math.abs(commonValue.startCell - id) + 1;
            const connectData = `first-${commonValue.startCell}-second-${id}-totalDay-${totalDay}`;
            commonValue.rowsTags.forEach((element) => {
                document
                    .getElementById(element)
                    .setAttribute('connectData', connectData);
            });
            commonValue.changeRowStatus = false;
        }
    }
    commonValue.rowsTags = [];
}

function draw(e: any) {
    if (!e.target.classList.contains('date_word')) {
        let id = Number(e.target.id.split('-')[1]);
        //commonValue.drawId = id
        if (commonValue.insertPlace !== 0) {
            id = id - (commonValue.insertPlace - 1);
            commonValue.insertPlace = 0;
        }

        const checkElementIntersectResult = checkElementIntersect(e);
        const positionTop = checkElementIntersectResult.positionTop;

        if (commonValue.changeRowStatus) {
            console.log('不會吧');
            id = commonValue.changeEndTagId;
        }
        const intersectElement = document.querySelectorAll(`.container-${id}`);
        const intersectNumber = intersectElement.length;

        commonValue.nowTagIs = `toDoListTag-${id}-${intersectNumber}`;
        commonValue.rowsTags.push(`toDoListTag-${id}-${intersectNumber}`);

        const row = Math.ceil(id / 7);
        const place = document.getElementById(`cell-${id}-${row}`);
        const container = document.createElement('div');
        container.setAttribute('class', `container-${id} ${intersectNumber}`);
        place.appendChild(container);
        const root = ReactDOM.createRoot(container);
        root.render(
            <Tag
                id={`toDoListTag-${id}-${intersectNumber}`}
                className={`toDoListTag-${id}`}
                onDragStart={dragstart}
                onDragEnd={dragend}
                draggable="true"
                onClick={openToDoList}
                width={commonValue.cellWidth}
                top={positionTop}
                left={commonValue.positionLeft}
                right={commonValue.positionRight}
            >
                (No title)
            </Tag>
        );
    }
    //用useState代替
    commonValue.cellWidth = '100%';
    commonValue.positionRight = 'auto';
    commonValue.positionLeft = 'auto';
}

function openToDoList() {
    document.getElementById('allToDoListDayDialogBox').style.display = 'flex';
}

function dragstart(e: any) {
    const monthCellArray = Array.from(document.getElementsByClassName('date'));
    monthCellArray.forEach((element) => {
        element.removeEventListener('pointerenter', changeTagWidth);
    });
    //下共同連結的判斷式
    //setTimeout(() => (e.target.className = 'invisible'), 0);
    const elementPosition = getPosition(e.target);
    const cellSize = document.getElementById('cell-1-1').offsetWidth;
    let clickElementPlace = (e.clientX - elementPosition.x) / cellSize;
    if (clickElementPlace < 0) {
        clickElementPlace = 1;
    } else {
        clickElementPlace = Math.ceil(clickElementPlace);
    }
    commonValue.insertPlace = clickElementPlace;
    //e.dataTransfer.setData('width',`${e.target.offsetWidth}px`)
    commonValue.cellWidth = `${e.target.offsetWidth}px`;
}

const dragend = (e: any) => {
    commonValue.dragging = false;
    const cellId = e.target.parentNode.parentNode.id;
    const prevCell = document.getElementById(cellId);
    const tag = e.target.parentNode.className;
    const prevTag = document.getElementsByClassName(tag);
    prevCell.removeChild(prevTag[0]);
    commonValue.cellWidth = '100%';
    const newTag = document.getElementById(commonValue.nowTagIs);
    newTag.style.pointerEvents = 'auto';
};

export default {
    draw: draw,
    mouseDown: mouseDown,
    mouseUp: mouseUp,
};



 /*const rowEndId = perRowEndNumber[Math.ceil(startId/7)-1]
        const rowEnd = Math.ceil(endId/7)
        const rowStart = Math.ceil(startId/7)
        if(rowEnd !== rowStart){
            if(Math.abs(startId-rowEndId)*100 < width){
                let tagItem ={}
                let firstTagWidth = (Math.abs(startId-rowEndId)+1)*100
                if(startId === rowEndId){
                    firstTagWidth = 100
                }
                tagItem = {[startId]:[firstTagWidth,title,description,allConnectWidth]}
                newTagArray.push(tagItem)
                if(Math.abs(rowEnd-rowStart)>=2){
                    for(let i = rowStart+1; i<rowEnd;i++ ){
                    let otherTagStartId = perRowStartNumber[i]
                    let otherTagWidth = 700
                    tagItem = {[otherTagStartId]:[otherTagWidth,title,description,allConnectWidth]}
                    newTagArray.push(tagItem)
                    }
                }
                
                let endTagWidth = width-firstTagWidth
                let endTagStartId = perRowStartNumber[Math.ceil(endId/7)-1]
                tagItem = {[endTagStartId]:[endTagWidth,title,description,allConnectWidth]}
                newTagArray.push(tagItem)
                
            }
        }else{
            const tagItem = {[startId]:[width,title,description,allConnectWidth]}
            newTagArray.push(tagItem)
        }
        console.log("為何第二航")
        console.log(newTagArray)
        setTagsArray(newTagArray)
        console.log(isTagsArray)
        console.log(chooseCell)
        chooseCellArray.map((element)=>{
            console.log(element.length)
        })*/


        //第二版
            /*if(element[startOldTag]){
                if(element[startOldTag][1] !== title ||
                   element[startOldTag][2] !== description){
                    return element
                }
            }else if(perRowStartNumber.includes(connectTagPlace)){
                if(connectTagValueDescription !== description ||
                   connectTagValueTitle !== title){
                    return element
                }
            }else{
                return element
            }*/