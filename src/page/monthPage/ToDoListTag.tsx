import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Tag } from './actionStyle';

function getPosition (element:any) {
  let x = 0;
  let y = 0;
  while ( element ) {
    x += element.offsetLeft - element.scrollLeft + element.clientLeft;
    y += element.offsetTop - element.scrollLeft + element.clientTop;
    element = element.offsetParent;
  }

  return { x: x, y: y };
}


function checkElementIntersect(e:any){
    const id = Number(e.target.id.split("-")[1]);
    const row = Number(e.target.id.split("-")[2]);
    let positionTop:string="auto"
    let intersectNumber = 0

    const check = (element:any) => {
        const cellSize = document.getElementById("cell-1-1").offsetWidth
        const tagWidth = (element as HTMLElement).offsetWidth
        const perElementId = Number(element.id.split("-")[1])
        console.log("我"+perElementId)
        if(tagWidth>cellSize){
            const position = getPosition(element).x
            const elementRightPlace = Math.floor((position+tagWidth)/cellSize)
            let targetPlace = getPosition(e.target).x
            targetPlace = Math.ceil(targetPlace/cellSize)
            if(targetPlace<=elementRightPlace){
                return true
            }
        }else if(id === perElementId){
            return true
        }
    }
    for(let i=row*7-6; i<=row*7; i++ ){
        //const sameRowTag = document.querySelector(`.toDoListTag-${i}-0`)
        const sameRowTagOne = document.querySelector(`#toDoListTag-${i}-0`)
        const sameRowTagTwo = document.querySelector(`#toDoListTag-${i}-1`)
        const sameRowTagThree = document.querySelector(`#toDoListTag-${i}-2`)
        if(sameRowTagOne !== null){
            const result = check(sameRowTagOne)
            if(result){
                intersectNumber++
            }
        }
        
        if(sameRowTagTwo !== null){
            const result = check(sameRowTagTwo)
            if(result){
                intersectNumber++
            }
        }
        
        if(sameRowTagThree !== null){
            const result = check(sameRowTagThree)
            if(result){
                intersectNumber++
            }
        }
        
        /*if(i === id){
            intersectNumber++
        }*/

        console.log("交叉"+intersectNumber)
    }

    if(intersectNumber===0){
        positionTop = "auto"
    }else if(intersectNumber===1){
        positionTop = "50px"
    }else if(intersectNumber===2){
        positionTop = "75px"
    }
    return {positionTop:positionTop,intersectNumber:intersectNumber}
}


let startCell:number
let endCell:number
let cellWidth:string = "100%"
let dragging:boolean = false
let changeRowStatus:boolean=false
let insertPlace:number = 0
let startRow:number
let endRow:number
let positionLeft:string="auto"
let positionRight:string="auto"
let nowTagIs:string
let test:boolean
//let positionTop:string="auto"

function mouseDown(e:any){
    if(!e.target.className.includes("toDoListTag")){
        startCell = Number(e.target.id.split("-")[1])
        console.log(startCell)
        startRow = e.target.id.split("-")[2];
        console.log(startRow)
        draw(e)
        const monthCellArray = Array.from(document.getElementsByClassName("date"))
        monthCellArray.forEach(element => {
            element.addEventListener("mouseenter",changeTagWidth)

        });
        
    }
}

function changeTagZIndex(e:any){
    e.target.style.zIndex = "0";
}

function changeTagWidth(e:any){
    if(!dragging){
        //const startPlaceTag = document.querySelector<HTMLElement>(`.toDoListTag-${startCell}`);
        const startPlaceTag = document.getElementById(nowTagIs)
        startPlaceTag.addEventListener("mouseenter",changeTagZIndex)
        endCell = Number(e.target.id.split("-")[1]);
        endRow = e.target.id.split("-")[2];
        if(endRow !==startRow){
            changeRowStatus = true
            draw(e)
            changeRowStatus = false
        }else{
            const tagWidth:number = ((Math.abs(startCell-endCell)+1)*100)
            if(startCell>endCell){
                startPlaceTag.style.right="1%"
            }else if(startCell === endCell){
                startPlaceTag.style.left="auto"
                startPlaceTag.style.right="auto"
            }else{
                startPlaceTag.style.left="1%"
            }
            startPlaceTag.style.width = `${tagWidth}%`
        }
    }
}

function mouseUp(e:any){
    const monthCellArray = Array.from(document.getElementsByClassName("date"))
    monthCellArray.forEach(element => {
        element.removeEventListener("mouseenter",changeTagWidth)
    });

    //const  test = document.getElementById("test")
    //test.style.display = "none"
    //console.log(test)
    const dialogBox = document.getElementById("toDoListDialogBox")
    dialogBox.style.display="flex"
    dialogBox.setAttribute("className",`${startCell}`)
    setTimeout(function(){
        document.getElementById("toDoListTitle").focus()
    },0)
    const startPlaceTag = document.querySelector<HTMLElement>(`.toDoListTag-${startCell}`);
    startPlaceTag.removeEventListener("mouseenter",changeTagZIndex)
    startPlaceTag.style.zIndex = "5";
}

function draw(e:any){
    let id = Number(e.target.id.split("-")[1]);
    if(id){
        if(insertPlace !== 0){
            id =id - (insertPlace-1)
            insertPlace = 0
        }
        
        if(changeRowStatus){
            const perRowStartNumber = [1,8,15,22,29,36]
            const perRowEndNumber = [7,14,21,28,35,42]
            const startPlaceTag = document.querySelector<HTMLElement>(`.toDoListTag-${startCell}`);
            if(startRow>endRow){
                if(perRowStartNumber.includes(id)){
                    id = id +6
                    positionRight = "1%"
                    cellWidth = "700%"
                }else if(perRowEndNumber.includes(id)){
                    cellWidth = "100%"
                    startPlaceTag.style.right = "1%"
                    startPlaceTag.style.width="700%"
                }else{
                    const firstRowWidth = (Math.abs(startCell - (startRow*7-6))+1)*100
                    startPlaceTag.style.right="1%"
                    startPlaceTag.style.width= `${firstRowWidth}%`
                    const SecondRowWidth =  (Math.abs(endCell - (endRow*7))+1)*100
                    id = endRow*7
                    positionRight = "1%"
                    cellWidth = `${SecondRowWidth}%`
                }
            }else if(startRow<endRow){
                if(perRowStartNumber.includes(id)){
                    startPlaceTag.style.width="700%"
                    cellWidth = "100%"
                }else if(perRowEndNumber.includes(id)){
                    id = id-6
                    cellWidth = "700%"
                }else{
                    const firstRowWidth = (Math.abs(startCell - startRow*7)+1)*100
                    startPlaceTag.style.width= `${firstRowWidth}%`
                    const SecondRowWidth =  (Math.abs(endCell - (endRow*7-6))+1)*100
                    id = endRow*7-6
                    cellWidth = `${SecondRowWidth}%`
                }

            }
        }

        

        const checkElementIntersectResult = checkElementIntersect(e)
        const intersectElement = document.querySelectorAll(`.container-${id}`)
        const intersectNumber = intersectElement.length

        console.log("這個長度"+intersectNumber)
        const positionTop = checkElementIntersectResult.positionTop

        const row = Math.ceil( id/7 )
        const place = document.getElementById(`cell-${id}-${row}`)
        const container = document.createElement("div");
        container.setAttribute("class", `container-${id} ${intersectNumber}`);
        place.appendChild(container);
        const root = ReactDOM.createRoot(container);
        nowTagIs = `toDoListTag-${id}-${intersectNumber}`
        root.render(
            <Tag
                id = {`toDoListTag-${id}-${intersectNumber}`}
                className={`toDoListTag-${id}`}
                onDragStart={dragstart}
                onDragEnd={dragend}
                draggable="true"
                width={cellWidth}
                top = {positionTop}
                left = {positionLeft}
                right={positionRight}
                >
                (No title)
            </Tag>
        );

    }
    cellWidth = "100%"
    positionRight = "auto"
    positionLeft = "auto"
};


function dragstart(e: any){
    dragging = true
    const monthCellArray = Array.from(document.getElementsByClassName("date"))
    monthCellArray.forEach(element => {
        element.removeEventListener("mouseenter",changeTagWidth)
    });
    //setTimeout(() => (e.target.className = 'invisible'), 0);
    const elementPosition = getPosition(e.target)
    const cellSize = document.getElementById("cell-1-1").offsetWidth
    let clickElementPlace = (e.clientX-elementPosition.x)/cellSize
    if(clickElementPlace < 0){
        clickElementPlace = 1
    }else{
        clickElementPlace = Math.ceil(clickElementPlace)
    }
    insertPlace = clickElementPlace
    //e.dataTransfer.setData('width',`${e.target.offsetWidth}px`)
    cellWidth = `${e.target.offsetWidth}px`
};

const dragend = (e: any) => {
    dragging = false
    const cellId = e.target.parentNode.parentNode.id
    const prevCell = document.getElementById(cellId)
    const tag = e.target.parentNode.className
    const prevTag = document.getElementsByClassName(tag)
    prevCell.removeChild(prevTag[0]);
    cellWidth = "100%"

};

export default{
    draw:draw,
    mouseDown:mouseDown,
    mouseUp:mouseUp
}