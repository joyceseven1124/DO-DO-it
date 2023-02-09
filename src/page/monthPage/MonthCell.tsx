import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import ToDoListDialogBox from './ToDoListDialogBox';
import ToDoListTag from './ToDoListTag';
import SignIn from "../../components/navigation/member/SignIn"
import {memberStatus} from "../../index"
import styled from 'styled-components';
import styles from '/public/css/monthPage.module.css';
import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import weekday from 'dayjs/plugin/weekday';
import findMaxDay from '../../components/commonFunction/findMaxDay';
dayjs.extend(toObject);
dayjs.extend(weekday);

export const tagData = createContext({
    isTagsArray: undefined,
    tagStartCell: undefined,
    tagEndCell: undefined,
    searchMonth:undefined,
    setTagsArray: undefined,
    setTagStartCell:undefined,
    setTagEndCell:undefined,
    dayStart:undefined,
    setDayStart:undefined,
    dayEnd:undefined,
    setDayEnd:undefined,
    startDayInit:undefined,
    endDayInit:undefined,
    setChooseCell:undefined,
    chooseCell:undefined,
});

interface DayCell {
    primary: string;
    nowTime?: boolean;
    bgColor?: boolean;
}
//更改經過的樣式
const DayCell = styled.div<DayCell>`
    position: relative;
    background-color: ${({ bgColor }) => {
        return bgColor ? 'var(--nowTimeBgColor)' : 'none';
    }};

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


export default function MonthCell() {
    //const [signInCardStatus,setSignInCardStatus] = useState(false)
    //const [registerCardStatus,setRegisterCardStatus] = useState(false)
    const [isTagsArray, setTagsArray] = useState([]);
    const [dayStart,setDayStart] = useState(0)
    const [dayEnd,setDayEnd] = useState(0)
    const [tagTitle, setTagTitle] = useState('(No Title)');
    const [tagStartCell, setTagStartCell] = useState(0);
    const [tagEndCell, setTagEndCell] = useState(0);
    const [activeCell,setActiveCell] = useState(false)
    const [showCardDisplay, setShowCardDisplay] = useState(false);
    const [chooseCell,setChooseCell] = useState([])
    const [monthCellHeight,setMonthCellHeight] = useState(900)
    const startDayInit = useRef(0);
    const endDayInit = useRef(0)
    const {memberNowStatus} = useContext(memberStatus)
 

    const searchMonth = useSelector(
        (state: RootState) => state.timeControlReducer.searchMonth
    );
    const monthNumber = useSelector(
        (state: RootState) => state.timeControlReducer.monthNumber
    );
    const memberData = useSelector((state:RootState) => state.logInReducer.name)
    console.log("再看一次")
    console.log(memberData)
    console.log("是否成功")
    useEffect(() => {
        setTagsArray([]);
        setChooseCell([])
        setMonthCellHeight(900)
    }, [searchMonth]);

    useEffect(() => {
        if(!memberNowStatus){
            setTagsArray([]);
            setChooseCell([])
            setMonthCellHeight(900)
        }
    }, [memberNowStatus]);

    function handleClick() {
        
    }
    //<div ref={tagRef}></div>
    function Cell() {
        let nowMonthMaxDay = findMaxDay(monthNumber);
        let preMonthMaxDay = findMaxDay(monthNumber - 1);

        let nowTime: string = dayjs().format('YYYY-MM-DD');
        const nowMonth = Number(nowTime.split('-')[1]);
        const nowDate = Number(nowTime.split('-')[2]);

        let monthStart: number = dayjs()
            .add(searchMonth, 'month')
            .date(1)
            .get('day');
        let monthEnd: number = dayjs()
            .add(searchMonth, 'month')
            .date(nowMonthMaxDay)
            .get('day');

        let cells = 35;
        if (monthStart === 0) {
            monthStart = monthStart + 7;
            cells = 42;
        } else if (monthStart === 6 && monthEnd !== 0) {
            cells = 42;
        }

        let monthDataArray = [];
        let nextMonthDay = 1;
        let thisMonthDay = 1;
        let preMonthDay = preMonthMaxDay - monthStart + 2;
       
        for (let i = 1; i <= cells; i++) {
            let color: string;
            let date: number;
            let nowTimeResult: boolean = false;
            let activeStatus:boolean = false;
            if (i < monthStart) {
                color = 'var(--otherMonthWorldColor)';
                date = preMonthDay;
                preMonthDay++;
            } else if (i <= nowMonthMaxDay + monthStart - 1) {
                color = 'var(--nowMonthWorldColor)';
                date = thisMonthDay;
                if (monthNumber === nowMonth && thisMonthDay === nowDate) {
                    nowTimeResult = true;
                }
                thisMonthDay++;
            } else {
                color = 'var(--otherMonthWorldColor)';
                date = nextMonthDay;
                nextMonthDay++;
            }

            
            let chooseCellArray = [...chooseCell]
            let orderNumber = 0
            const perRowStartNumber = [1, 8, 15, 22, 29, 36];
            chooseCellArray.map((element)=>{
                if(element.includes(i)){
                    orderNumber++
                    if(element[0] === i && element.length === 1){
                        orderNumber--
                    }else if (element[0] === i){
                        orderNumber--
                    }else if(perRowStartNumber.includes(i)){
                            orderNumber--
                    }
                }
            })
            useEffect(()=>{
                    if(orderNumber >2){
                    const height = 300*orderNumber
                        if(height > monthCellHeight){
                            setMonthCellHeight(height)
                        }
                    }
                }
            ,[orderNumber])
            let newTagArray = [...isTagsArray];
            newTagArray = newTagArray.map((element) => {
                //const startPlace = Number(Object.keys(element)[0])
                //const endPlace = Number(Object.values(element)[0])/100+startPlace-1

                //let endPlace = Object.values(element)[0]
                //endPlace = Object.values(endPlace)[0]
                //let connectWidth = Object.values(element)[0]
                //connectWidth = Object.values(connectWidth)[3]

                const startPlace = element.id
                const endPlace = startPlace + element.width/100-1
                if(startPlace === i && endPlace === i){
                    orderNumber++
                }else if(startPlace === i && endPlace > i){
                    orderNumber++
                }


                if (startPlace === i) {
                    //const tagWidth = `${element[i][0]}%`
                    const tagWidth = `${element.width}%`
                    const connectWidth = element.connectWidth
                    return (
                        <ToDoListTag
                            key={`tag-content-${i}-${orderNumber}`}
                            id = {`tag-${i}-${orderNumber}`}
                            title={tagTitle}
                            width={tagWidth}
                            connectWidth = {connectWidth}
                            tagOrder={orderNumber}
                            date={date}
                        />
                    );
                }
            });
            


            let row = Math.ceil(i / 7);
            if(activeCell){
                if(tagStartCell <= i && i <= tagEndCell){
                    activeStatus = true
                }else if(tagStartCell >= i && i >= tagEndCell){
                    activeStatus = true
                }
                let dayHtml = (
                    <DayCell
                        id={`cell-${i}-${row}`}
                        key={`cmd-${i}`}
                        className={`date ${date}`}
                        primary={color}
                        nowTime={nowTimeResult}
                        bgColor={activeStatus}
                        onPointerEnter={EnterCell}
                    >
                        <div className="date_word">{date}</div>
                        <div onClick={test}>{newTagArray}</div>
                    </DayCell>
                );
                monthDataArray.push(dayHtml);
            }else{
                let dayHtml = (
                    <DayCell
                        id={`cell-${i}-${row}`}
                        key={`cmd-${i}`}
                        className={`date ${date}`}
                        primary={color}
                        nowTime={nowTimeResult}
                        bgColor={activeStatus}
                    >
                        <div className="date_word">{date}</div>
                        <div onClick={test}>{newTagArray}</div>
                    </DayCell>
                );
                monthDataArray.push(dayHtml);
            }
    }
        return <>{monthDataArray}</>;
    }

    //標籤點擊打開清單
    function test() {
    }

    function EnterCell(e:any) {
        const id = Number(e.target.id.split("-")[1])
        setTagEndCell(id)
    }

    function mouseDown(e: any) {
        //需登錄才能使用
        /*if(!memberNowStatus){
            setSignInCardStatus(true)
            return
        }*/
        if (e.target.className.includes('toDoListTag')) {
            return
        }
        //被覆蓋了
        //setTagsArray({...prevState,...newArray})
        setActiveCell(true)
        //let newTagState = [...isTagsArray];
        let cellId = Number(e.target.id.split('-')[1]);
        let chooseDate = e.target.classList[3]
        //newTagState.push(cellId);
        setDayStart(chooseDate)
        setTagStartCell(cellId);
        startDayInit.current = chooseDate
    }

    function mouseUp(e: any) {
        //需登錄才能使用
        if (e.target.className.includes('toDoListTag')) {
            return
        }
        setActiveCell(false)
        let prevChooseCell = [...chooseCell]
        let nowChooseCell = []
        if(tagStartCell>tagEndCell){
            for(let i= tagEndCell; i<=tagStartCell;i++){
                nowChooseCell.push(i)
            }
        }else if(tagStartCell<tagEndCell){
             for(let i= tagStartCell; i<=tagEndCell;i++){
                nowChooseCell.push(i)
            }
        }else{
            let oneCell = tagStartCell
            nowChooseCell.push(oneCell)
        }
        prevChooseCell.push(nowChooseCell)
        let chooseDate = e.target.classList[3]
        setDayEnd(chooseDate)
        setChooseCell(prevChooseCell)
        setShowCardDisplay(true);
        endDayInit.current = chooseDate
    }

    const dragDrop = (e: any) => {
        if(e.target.id){
            const allConnectWidth = Number(e.dataTransfer.getData('allConnectWidth'))
            const startOldTag = Number(e.dataTransfer.getData('startOldTag'))
            const endOldTag = startOldTag+allConnectWidth/100-1
            const insertPlace = e.dataTransfer.getData('insertPlace')
            const title = e.dataTransfer.getData('title')
            const description = e.dataTransfer.getData('description')
            let startId:number = Number(e.target.id.split("-")[1])
            let endId:number = (startId+allConnectWidth/100)-1
            //const width:number =(Math.abs(startId-endId)+1)*100
            let tagArray = [...isTagsArray];
            let chooseCellArray = [...chooseCell]


            if(allConnectWidth <=700){
                if (insertPlace !== 0) {
                    startId = startId - (insertPlace - 1);
                    endId = startId+allConnectWidth/100-1
                }
            }
            const perRowStartNumber = [1, 8, 15, 22, 29, 36];
            const perRowEndNumber = [7, 14, 21, 28, 35, 42];
            let newTagArray = tagArray.filter((element)=>{
                //const connectTagPlace = Number(Object.keys(element)[0])

                //let connectTagValue = Object.values(element)[0]
                //let connectTagValueTitle = Object.values(connectTagValue)[1]
                //let connectTagValueDescription = Object.values(connectTagValue)[2]
                //let connectTagValueWidth = Object.values(connectTagValue)[3]
                let connectTagValueTitle = element.title
                let connectTagValueDescription =element.description
                let connectTagValueWidth = element.connectWidth
                if(connectTagValueTitle !== title ||
                connectTagValueDescription !== description ||
                connectTagValueWidth !== allConnectWidth){
                    return element
                }

            })

            
            const firstRowEndId = perRowEndNumber[Math.ceil(startId/7)-1]
            const rowEnd = Math.ceil(endId/7)
            const rowStart = Math.ceil(startId/7)
            let allWidth = allConnectWidth
            if(rowEnd !== rowStart){
                let tagItem ={}
                let firstTagWidth = (Math.abs(startId-firstRowEndId)+1)*100
                if(startId === firstRowEndId){
                    firstTagWidth = 100
                }
                //tagItem = {[startId]:[firstTagWidth,title,description,allConnectWidth]}
                tagItem = {id:startId,width:firstTagWidth,title:title,description:description,connectWidth:allConnectWidth}
                newTagArray.push(tagItem)
                allWidth = allWidth - firstTagWidth
                if(Math.abs(rowEnd-rowStart)>=2){
                    for(let i = rowStart+1; i<rowEnd;i++ ){
                        let otherTagStartId = perRowStartNumber[i-1]
                        let otherTagWidth = 700
                        //tagItem = {[otherTagStartId]:[otherTagWidth,title,description,allConnectWidth]}
                        const tagItem = {id:otherTagStartId,width:otherTagWidth,title:title,description:description,connectWidth:allConnectWidth}
                        newTagArray.push(tagItem)
                        allWidth = allWidth - otherTagWidth
                    }
                }
                let endTagWidth = allWidth
                if(endTagWidth>0){
                    let endTagStartId = perRowStartNumber[Math.ceil(endId/7)-1]
                    //tagItem = {[endTagStartId]:[endTagWidth,title,description,allConnectWidth]}
                    const tagItem = {id:endTagStartId,width:endTagWidth,title:title,description:description,connectWidth:allConnectWidth}
                    newTagArray.push(tagItem)
                }

            }else{
                //const tagItem = {[startId]:[allWidth,title,description,allConnectWidth]}
                const tagItem = {id:startId,width:allWidth,title:title,description:description,connectWidth:allConnectWidth}
                newTagArray.push(tagItem)
            }
            let newChooseAllCells = chooseCellArray.filter((element)=>{
                const start = element[0]
                const end = element[element.length-1]
                if(start !== startOldTag && end !== endOldTag){
                    return element
                }
            })
            let newChooseCell = []
            for(let i=startId;i<=endId;i++){
                newChooseCell.push(i)
            }
            newChooseAllCells.push(newChooseCell)
            setChooseCell(newChooseAllCells)
            setTagsArray(newTagArray)
        }
    };

    const dragover = (e: any) => {
        e.preventDefault();
    };
    const dragenter = (e: any) => {

        e.preventDefault();
    };

    const dragleave = (e: any) => {
        e.preventDefault();
    };


    return (
        <tagData.Provider
            value={{
                setTagsArray,
                setTagEndCell,
                setTagStartCell,
                isTagsArray,
                setChooseCell,
                chooseCell,
                tagStartCell,
                tagEndCell,
                searchMonth,
                dayStart,
                setDayStart,
                dayEnd,
                setDayEnd,
                startDayInit,
                endDayInit
            }}
        >
            <div
                className={styles.monthCell}
                onPointerDown={mouseDown}
                onPointerUp={mouseUp}
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragDrop}
                style={{height:`${monthCellHeight}px`}}
            >
                <Cell />
            </div>
            {showCardDisplay?(<><ToDoListDialogBox status={showCardDisplay} setCardStatus={setShowCardDisplay}/></>):null}
        </tagData.Provider>
    );
}
