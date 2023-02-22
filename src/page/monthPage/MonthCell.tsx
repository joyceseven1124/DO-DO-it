import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import ToDoListDialogBox from './ToDoListDialogBox';
import ToDoListTag from './ToDoListTag';
import EditTagDialog from './EditTagDialog';
import {memberStatus} from "../../"
import { commonData } from '../MonthPage';
import db from "../../firebase/firebase"
import styled from 'styled-components';
import styles from '/public/css/monthPage.module.css';
import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import weekday from 'dayjs/plugin/weekday';
import findMaxDay from '../../components/commonFunction/findMaxDay';
dayjs.extend(toObject);
dayjs.extend(weekday);

export const tagData = createContext({
    tagStartCell: undefined,
    tagEndCell: undefined,
    searchMonth:undefined,
    setTagStartCell:undefined,
    setTagEndCell:undefined,
    dayStart:undefined,
    setDayStart:undefined,
    dayEnd:undefined,
    setDayEnd:undefined,
    startDayInit:undefined,
    endDayInit:undefined,
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


export default function MonthCell(props:any) {
    const [dayStart,setDayStart] = useState(0)
    const [dayEnd,setDayEnd] = useState(0)
    const [tagStartCell, setTagStartCell] = useState(0);
    const [tagEndCell, setTagEndCell] = useState(0);
    const [activeCell,setActiveCell] = useState(false)
    const [showCardDisplay, setShowCardDisplay] = useState(false);
    //const [chooseCell,setChooseCell] = useState([])
    const [monthCellHeight,setMonthCellHeight] = useState(900)
    const startDayInit = useRef(0);
    const endDayInit = useRef(0)
    const {memberInformation} = useContext(memberStatus)
    const {setTagsArray} = useContext(commonData)
    const {isTagsArray} = useContext(commonData)
    const {chooseCell} = useContext(commonData)
    const {setChooseCell} = useContext(commonData)


    const searchMonth = useSelector(
        (state: RootState) => state.timeControlReducer.searchMonth
    );
    const monthNumber = useSelector(
        (state: RootState) => state.timeControlReducer.monthNumber
    );
    const yearNumber = useSelector(
         (state: RootState) => state.timeControlReducer.year
    )
    const memberEmail = useSelector((state:RootState) => state.logInReducer.email)
    

    

    useEffect(() => {
        setTagsArray([]);
        setMonthCellHeight(900)
        setChooseCell([])
        if(memberInformation !== ""){
            const searchDataTime = `${yearNumber}Y${monthNumber}M`
            let monthData = db.getToDoListData(memberInformation,searchDataTime)
            let data:any = []
            let chooseCellData:any = []
            monthData.then((msg)=>{
                if(msg!=="fail"&& msg !== null){
                    let moreRowsTag = msg.filter((element:any)=>{
                        if(element.length>1){
                            return element
                        }
                        data.push(element)
                        const startId = element.id
                        const endId = startId+element.connectWidth/100-1
                        const result = makeChooseCellArray(startId,endId,"change")
                        chooseCellData.push(result[0])
                    })
                    moreRowsTag.map((element:any,index)=>{
                        if(element[0]){
                            data.push(element[0])
                            const startId = element[0].id
                            const endId = startId+element[0].connectWidth/100-1
                            const result = makeChooseCellArray(startId,endId,"change")
                            chooseCellData.push(result[0])
                        }
                        if(element[1]){
                            data.push(element[1])
                        }

                        if(element[2]){
                            data.push(element[2])
                        }

                        if(element[3]){
                            data.push(element[3])
                        }

                        if(element[4]){
                            data.push(element[4])
                        }
                        if(element[5]){
                            data.push(element[5])
                        }
                        
                    })
                    setChooseCell(chooseCellData)
                    setTagsArray(data)
                }
            })
        }else{
        setChooseCell([])
        }
    }, [searchMonth,memberInformation]);


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
                const startPlace = element.id
                const endPlace = startPlace + element.width/100-1
                if(startPlace === i && endPlace === i){
                    orderNumber++
                }else if(startPlace === i && endPlace > i){
                    orderNumber++
                }


                if (startPlace === i) {
                    const tagWidth = `${element.width}%`
                    const connectWidth = element.connectWidth
                    return (
                        <ToDoListTag
                            key={`tag-content-${i}-${orderNumber}`}
                            id = {`tag-${i}-${orderNumber}`}
                            title={element.title}
                            width={tagWidth}
                            connectWidth = {connectWidth}
                            tagOrder={orderNumber}
                            date={date}
                            color={element.color}
                            index={element.index}
                            description={element.description}
                            status = {element.status}
                            friend = {element.receiveEmail}
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
                        <div>{newTagArray}</div>
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
                        <div>{newTagArray}</div>
                    </DayCell>
                );
                monthDataArray.push(dayHtml);
            }
    }
        return <>{monthDataArray}</>;
    }

    function EnterCell(e:any) {
        const id = Number(e.target.id.split("-")[1])
        setTagEndCell(id)
    }

    function mouseDown(e: any) {
        if (e.target.parentNode.className.includes('toDoListTag')) {
            return
        }
        setActiveCell(true)
        e.target.style.cursor = "grab"
        let cellId = Number(e.target.id.split('-')[1]);
        let chooseDate = e.target.classList[3]
        setDayStart(chooseDate)
        setTagStartCell(cellId);
        startDayInit.current = chooseDate
    }

    function makeChooseCellArray(tagStartCell:number,tagEndCell:number,status:string){
        let prevChooseCell:any
        if(status === "usual"){
            prevChooseCell = [...chooseCell]
        }else{
            prevChooseCell=[]
        }
        //let prevChooseCell = [...chooseCell]
        //let prevChooseCell=[]
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
        return prevChooseCell
    }

    function mouseUp(e: any) {
        if (!e.target.id.includes('cell')) {
            return
        }
        setActiveCell(false)
        let chooseDate = e.target.classList[3]
        setDayEnd(chooseDate)
        const newChooseAllCells = makeChooseCellArray(tagStartCell,tagEndCell,"usual")
        setChooseCell(newChooseAllCells)
        setShowCardDisplay(true);
        endDayInit.current = chooseDate
    }

    const dragDrop = (e: any) => {
        if(e.target.id){
            const searchDataTime = `${yearNumber}Y${monthNumber}M`
            const allConnectWidth = Number(e.dataTransfer.getData('allConnectWidth'))
            const startOldTag = Number(e.dataTransfer.getData('startOldTag'))
            const endOldTag = startOldTag+allConnectWidth/100-1
            const insertPlace = e.dataTransfer.getData('insertPlace')
            const title = e.dataTransfer.getData('title')
            const description = e.dataTransfer.getData('description')
            const color = e.dataTransfer.getData('color')
            const index = e.dataTransfer.getData("index")
            let date = Number(e.target.className.split(" ")[3])
            let startDate:number = date
            let endDate:number = startDate+allConnectWidth/100 -1
            let startId:number = Number(e.target.id.split("-")[1])
            let endId:number = (startId+allConnectWidth/100)-1
            let tagArray = [...isTagsArray];
            let chooseCellArray = [...chooseCell]
            let toDoListStatus
            let yearStart
            let yearEnd
            let monthStart
            let monthEnd
            let updateData


            if(allConnectWidth <=700){
                if (insertPlace !== 0) {
                    startDate = date - (insertPlace - 1)
                    endDate = startDate  -1 +allConnectWidth/100
                    startId = startId - (insertPlace - 1);
                    endId = startId+allConnectWidth/100-1
                }
            }
            const perRowStartNumber = [1, 8, 15, 22, 29, 36];
            const perRowEndNumber = [7, 14, 21, 28, 35, 42];
            let newTagArray = tagArray.filter((element)=>{
                let connectTagValueIndex = element.index
                toDoListStatus = element.status
                yearStart = element.yearStart
                yearEnd=element.yearEnd
                monthStart = element.monthStart
                monthEnd = element.monthEnd
                if(startId <7 && startDate > 7){
                    monthStart = monthNumber -1
                }

                if(startId >28 && startDate < 7){
                    monthStart = monthNumber +1
                }

                if(endId < 7 && endDate > 7){
                    monthEnd = monthNumber -1
                }

                if(endId > 28 && endDate < 7){
                    monthEnd = monthNumber +1
                }
                
                if(connectTagValueIndex.toString() !== index){
                return element
                }

            })

            
            const firstRowEndId = perRowEndNumber[Math.ceil(startId/7)-1]
            const rowEnd = Math.ceil(endId/7)
            const rowStart = Math.ceil(startId/7)
            let allWidth = allConnectWidth
            if(rowEnd !== rowStart){
                let upDateArray = []
                let tagItem ={}
                let firstTagWidth = (Math.abs(startId-firstRowEndId)+1)*100
                if(startId === firstRowEndId){
                    firstTagWidth = 100
                }
                tagItem = {id:startId,width:firstTagWidth,title:title,description:description,
                            connectWidth:allConnectWidth,color:color,index:index,status:toDoListStatus,
                            yearStart:yearStart,yearEnd:yearEnd,monthStart:monthStart,monthEnd:monthEnd,
                            dayStart:startDate,dayEnd:endDate}
                newTagArray.push(tagItem)
                upDateArray.push(tagItem)
                allWidth = allWidth - firstTagWidth
                if(Math.abs(rowEnd-rowStart)>=2){
                    for(let i = rowStart+1; i<rowEnd;i++ ){
                        let otherTagStartId = perRowStartNumber[i-1]
                        let otherTagWidth = 700
                        const tagItem = {id:otherTagStartId,width:otherTagWidth,title:title,description:description,
                                        connectWidth:allConnectWidth,color:color,index:index,status:toDoListStatus,
                                        yearStart:yearStart,yearEnd:yearEnd,monthStart:monthStart,monthEnd:monthEnd,
                                        dayStart:startDate,dayEnd:endDate}
                        newTagArray.push(tagItem)
                        upDateArray.push(tagItem)
                        allWidth = allWidth - otherTagWidth
                    }
                }
                let endTagWidth = allWidth
                if(endTagWidth>0){
                    let endTagStartId = perRowStartNumber[Math.ceil(endId/7)-1]
                    const tagItem = {id:endTagStartId,width:endTagWidth,title:title,description:description,
                                    connectWidth:allConnectWidth,color:color,index:index,status:toDoListStatus,
                                    yearStart:yearStart,yearEnd:yearEnd,monthStart:monthStart,monthEnd:monthEnd,
                                    dayStart:startDate,dayEnd:endDate}
                    newTagArray.push(tagItem)
                    upDateArray.push(tagItem)
                }
                updateData = [...upDateArray]
            }else{
                const tagItem = {id:startId,width:allWidth,title:title,description:description,
                                connectWidth:allConnectWidth,color:color,index:index,status:toDoListStatus,
                                yearStart:yearStart,yearEnd:yearEnd,monthStart:monthStart,monthEnd:monthEnd,
                                dayStart:startDate,dayEnd:endDate}
                newTagArray.push(tagItem)
                updateData = tagItem
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
            db.updateData(memberInformation,searchDataTime,Number(index),updateData)
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
                setTagEndCell,
                setTagStartCell,
                tagStartCell,
                tagEndCell,
                searchMonth,
                dayStart,
                setDayStart,
                dayEnd,
                setDayEnd,
                startDayInit,
                endDayInit,
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
