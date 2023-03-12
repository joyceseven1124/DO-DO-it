import React, {
    useEffect,
    useState,
    useRef,
    createContext,
    useContext,
} from 'react';
import { Provider, useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import ToDoListTag from '../monthCell/ToDoListTag';
import { memberStatus } from '../../../';
import { commonData } from '../../MonthPage';
import { tagData } from '../MonthCell';
import db from '../../../firebase/firebase';
import styles from '/public/css/monthPage.module.css';
import styled from 'styled-components';
import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import weekday from 'dayjs/plugin/weekday';
import findMaxDay from '../../../components/commonFunction/findMaxDay';
import dragDropHandle  from "../utilityFunction/dropFunction"
import makeChooseCellArray  from "../utilityFunction/makeChooseCellArray"
dayjs.extend(toObject);
dayjs.extend(weekday);


interface DayCell {
    primary: string;
    nowTime?: boolean;
    bgColor?: boolean;
}
const DayCell = styled.div<DayCell>`
    position: relative;
    background-color: ${({ bgColor }) => {
        return bgColor ? 'rgb(0 91 97)' : 'none';
    }};

    .date_word {
        color: ${(props) => props.primary};
        cursor: auto;
        padding: 5px;
        border: 50%;
        width: 20px;
        height: 20px;
        padding: 2px;
        box-sizing: border-box;
        border-radius: 50%;
        margin: auto;
        margin-top: 5px;
        z-index:-1;
        background-color: ${({ nowTime }) => {
            return nowTime ? 'rgb(0,91,97)' : null;
        }};
    }
`;



export default function Cell(props:any) {
    const { memberInformation } = useContext(memberStatus);
    const { setTagsArray } = useContext(commonData);
    const { isTagsArray } = useContext(commonData);
    const { chooseCell } = useContext(commonData);
    const { setChooseCell } = useContext(commonData);
    const { setTagStartCell } = useContext(tagData);
    const { setTagEndCell } = useContext(tagData);
    const { setDayStart } = useContext(tagData);
    const { setDayEnd } = useContext(tagData);
    const { startDayInit } = useContext(tagData);
    const { endDayInit } = useContext(tagData);
    const { tagStartCell } = useContext(tagData);
    const { tagEndCell } = useContext(tagData);
    const [activeCell, setActiveCell] = useState(false);
    //const [monthCellHeight, setMonthCellHeight] = useState(700);
    const monthCellHeight = useRef(700)
    let thisPageDay: number[] = [];

    const searchMonth = useSelector(
    (state: RootState) => state.timeControlReducer.searchMonth
    );
    const monthNumber = useSelector(
        (state: RootState) => state.timeControlReducer.monthNumber
    );
    const yearNumber = useSelector(
        (state: RootState) => state.timeControlReducer.year
    );

    function checkMouseUpPlace(e:any){
        if (!e.target.id.includes('cell')) {
            props.setErrorCardShow(true)
            props.setErrorCardWord("Please release the mouse in the grid")
            setActiveCell(false);
        }
        document.removeEventListener("mouseup",checkMouseUpPlace)
    }   

    function EnterCell(e: any) {
        const id = Number(e.target.id.split('-')[1]);
        setTagEndCell(id);
    }

    function mouseDown(e: any) {
        if (e.target.parentNode.className.includes('toDoListTag')) {
            return;
        }
        setActiveCell(true);
        e.target.style.cursor = 'grab';
        let cellId = Number(e.target.id.split('-')[1]);
        let chooseDate = e.target.classList[3];
        setDayStart(chooseDate);
        setTagStartCell(cellId);
        setTagEndCell(cellId);
        startDayInit.current = chooseDate;
        document.addEventListener("mouseup", checkMouseUpPlace);
    }

    function mouseUp(e: any) {
        if (!e.target.id.includes('cell')) {
            return;
        }
        
        let chooseDate = e.target.classList[3];
        setDayEnd(chooseDate);
        const newChooseAllCells = makeChooseCellArray(
            tagStartCell,
            tagEndCell,
            'usual',
            chooseCell
        );
        let cellId = Number(e.target.id.split('-')[1]);
        
        setActiveCell(false);
        setChooseCell(newChooseAllCells);
        props.setShowCardDisplay(true);
        endDayInit.current = chooseDate;
    }

    const dragDrop = (e: any) => {
        if (e.target.id) {
            let resultHandleData = dragDropHandle(e,thisPageDay,isTagsArray,chooseCell,yearNumber,monthNumber)
            let resultSaveData = db.updateData(
                memberInformation,
                resultHandleData.time,
                Number(resultHandleData.index),
                resultHandleData.updateData
            );

            resultSaveData.then((msg)=>{
                if(msg === "success"){
                    setChooseCell(resultHandleData.newChooseAllCells);
                    setTagsArray(resultHandleData.newTagArray);
                }else{
                    props.setErrorCardShow(true)
                    props.setErrorCardWord("Save failed")
                }
            })
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
    let maxOrderNumber = 0

    for (let i = 1; i <= cells; i++) {
        let color: string;
        let date: number;
        let nowTimeResult: boolean = false;
        let activeStatus: boolean = false;
        if (i < monthStart) {
            color = 'var(--otherMonthWorldColor)';
            date = preMonthDay;
            preMonthDay++;
        } else if (i <= nowMonthMaxDay + monthStart - 1) {
            color = 'white';
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

        let chooseCellArray = [...chooseCell];
        let orderNumber = 0;
        

        const perRowStartNumber = [1, 8, 15, 22, 29, 36];
        chooseCellArray.map((element) => {
            if (element.includes(i)) {
                orderNumber++;
                if (element[0] === i && element.length === 1) {
                    orderNumber--;
                } else if (element[0] === i && element.length > 1) {
                    orderNumber--;
                } else if (perRowStartNumber.includes(i)) {
                    orderNumber--;
                }
            }
        });
        

        let newTagArray = [...isTagsArray].sort((a, b) => a.index - b.index);
        newTagArray = newTagArray.map((element) => {
            const startPlace = element.id;
            const endPlace = startPlace + element.width / 100 - 1;
            
            if (startPlace === i && endPlace === i) {
                orderNumber++;
            } else if (startPlace === i && endPlace > i) {
                orderNumber++;
            }
            

            if (startPlace === i) {
                const tagWidth = `${element.width}%`;
                const connectWidth = element.connectWidth;
                return (
                    <ToDoListTag
                        key={`tag-content-${i}-${orderNumber}`}
                        id={`tag-${i}-${orderNumber}`}
                        title={element.title}
                        width={tagWidth}
                        connectWidth={connectWidth}
                        tagOrder={orderNumber}
                        date={date}
                        color={element.color}
                        index={element.index}
                        description={element.description}
                        status={element.status}
                        friend={element.receiveEmail}
                    />
                );
            }
        });
        

        if(orderNumber > maxOrderNumber){
            maxOrderNumber = orderNumber
            if (maxOrderNumber > 2) {
                const height = 300 * maxOrderNumber;
                if (height > monthCellHeight.current && maxOrderNumber >= 3) {
                    monthCellHeight.current = height;
                }else{
                    monthCellHeight.current = height;
                }
            }else{
                monthCellHeight.current = 700;
            }
        }


        let row = Math.ceil(i / 7);
        if (activeCell) {
            if (tagStartCell <= i && i <= tagEndCell) {
                activeStatus = true;
            } else if (tagStartCell >= i && i >= tagEndCell) {
                activeStatus = true;
            }
        }
        let dayHtml = (
            <DayCell
                id={`cell-${i}-${row}`}
                key={`cmd-${i}`}
                className={`date ${date}`}
                primary={color}
                nowTime={nowTimeResult}
                bgColor={activeStatus}
                onPointerEnter={activeCell ? EnterCell:null}
                onPointerDown={mouseDown}
                onPointerUp={mouseUp}
                onDragOver={dragover}
                onDragEnter={dragenter}
                onDragLeave={dragleave}
                onDrop={dragDrop}
                style={{ cursor: 'pointer' }}
            >
                <div className="date_word">{date}</div>
                <div>{newTagArray}</div>
            </DayCell>
        
            );
            monthDataArray.push(dayHtml);
            thisPageDay.push(date);
    }
    return <div
            className={styles.monthCell}
            style={{ height: `${monthCellHeight.current}px` }}>
                {monthDataArray}
            </div>
}