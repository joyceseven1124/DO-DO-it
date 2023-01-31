import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { DayCell} from './actionStyle';
import tag from "./ToDoListTag"
import styles from '/public/css/monthPage.module.css';
import colors from '/public/css/colors.module.css';
import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(toObject);
dayjs.extend(weekday);

console.log(colors)

//let maxDay: number;
//let maxPrevMonthDay:number

function findMaxDay(monthNumber: number) {
    const year: number = useSelector(
        (state: RootState) => state.timeControlReducer.year
    );
    if (monthNumber === 0) {
        monthNumber = 12;
    }
    const bigMonth = [1, 3, 5, 7, 8, 10, 12];
    let maxDay: number;
    if (bigMonth.includes(monthNumber)) {
        maxDay = 31;
    } else if (monthNumber === 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            maxDay = 29;
        } else {
            maxDay = 28;
        }
    } else {
        maxDay = 30;
    }
    return maxDay;
}

function generateMonthData(searchMonth: number) {
    const monthNumber = useSelector(
        (state: RootState) => state.timeControlReducer.monthNumber
    );

    let monthDataArray: any[] = [];
    let nowMonthMaxDay = findMaxDay(monthNumber);
    let preMonthMaxDay = findMaxDay(monthNumber - 1);

    let nowTime:string = dayjs().format('YYYY-MM-DD')
    console.log(nowTime.split("-"))
    const nowMonth = Number(nowTime.split("-")[1])
    const nowDate = Number(nowTime.split("-")[2])
    console.log(Number(nowMonth),Number(nowDate))
    if(monthNumber === Number(nowMonth)){

    }
   

    let monthStart: number = dayjs()
        .add(searchMonth, 'month')
        .date(1)
        .get('day');
    let cells = 35;
    if (monthStart === 0) {
        monthStart = monthStart + 7;
        cells = 42;
    } else if (monthStart === 6) {
        cells = 42;
    }

    let nextMonthDay = 1;
    let thisMonthDay = 1;
    let preMonthDay = preMonthMaxDay - monthStart + 2;
   
    for (let i = 1; i <= cells; i++) {
        if (i < monthStart) {
            let dayHtml = (
                <DayCell
                    id={`cell-${i}-1`}
                    primary={"var(--otherMonthWorldColor)"}
                    key={`cmd-${i}`}
                    className="date"
                >
                    <div className='date_word'>{preMonthDay}</div>
                </DayCell>
            );
            monthDataArray.push(dayHtml);
            preMonthDay = preMonthDay + 1;
        } else if (i <= nowMonthMaxDay + monthStart - 1) {
            let row =Math.ceil( i/7 )

            let nowTimeResult = false
            let primaryResult:string = "var(--thisMonthWorldColor)"
            if(monthNumber === nowMonth && thisMonthDay === nowDate){
                nowTimeResult = true
                //primaryResult = "var(--nowTimeWorldColor)"
            }
            
            let dayHtml = (
                <DayCell id={`cell-${i}-${row}`} primary={primaryResult} key={`cmd-${i}`} className="date" nowTime={nowTimeResult}>
                    <div className='date_word'>{thisMonthDay}</div>
                </DayCell>
            );
            monthDataArray.push(dayHtml);
            thisMonthDay++;
        } else {
            let row =Math.ceil( i/7 )
            let dayHtml = (
                <DayCell id={`cell-${i}-${row}`} primary={"var(--otherMonthWorldColor)"} key={`cmd-${i}`} className="date">
                    <div className='date_word'>{nextMonthDay}</div>
                </DayCell>
            );
            monthDataArray.push(dayHtml);
            nextMonthDay++;
        }
    }

    return  monthDataArray
}

export default function MonthCell() {
    const searchMonth = useSelector(
        (state: RootState) => state.timeControlReducer.searchMonth
    );
    let monthDataArray = generateMonthData(searchMonth);
    const [dayArrayIsValue, setDayArray] = useState([]);

    useEffect(() => {
        let newMonthDataArray = [...monthDataArray];
        setDayArray(newMonthDataArray);
    }, [searchMonth]);

    

    const dragDrop = (e: any) => {
        //const dragText = e.dataTransfer.getData('width')
        tag.draw(e)
    }

    const dragover = (e: any) => {
        e.preventDefault();
    };
    const dragenter = (e: any) => {
        e.preventDefault();
   
    };

    const dragleave = (e: any) => {
        e.preventDefault();
    };

    return(
        <div
            className={styles.monthCell}
            onDragOver={dragover}
            onDragEnter={dragenter}
            onDragLeave={dragleave}
            onDrop={dragDrop}
            onMouseDown={tag.mouseDown}
            onMouseUp={tag.mouseUp}
            >
            {dayArrayIsValue}
        </div>
    )
}
