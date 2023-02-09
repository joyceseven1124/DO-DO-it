import React, { useEffect, useState, useRef,useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/index';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/toDoListDialogBox.module.css';
import { tagData } from '../MonthCell';

export default function TimeInformation(props:any) {
    const { tagStartCell } = useContext(tagData);
    const { dayStart } = useContext(tagData);
    const { dayEnd } = useContext(tagData);
    const { setDayStart } = useContext(tagData);
    const { setDayEnd } = useContext(tagData)
    const { startDayInit } = useContext(tagData)
    const { endDayInit } = useContext(tagData)
    const monthNumber = useSelector(
        (state: RootState) => state.timeControlReducer.monthNumber
    );
    const year = useSelector(
        (state: RootState) => state.timeControlReducer.year
    );
    const [monthStart,setMonthStart] = useState(0)
    const [monthEnd,setMonthEnd] = useState(0)
    const [nowStartYear,setStartYear] = useState(0)
    const [nowEndYear,setEndYear] = useState(0)
    useEffect(()=>{
        setMonthStart(monthNumber)
        setMonthEnd(monthNumber)
    },[monthNumber])

    useEffect(()=>{
        setStartYear(year)
        setEndYear(year)
    },[year])
   
    props.data.yearStart =year
    props.data.yearEnd=year
    props.data.monthStart=monthNumber
    props.data.monthEnd=monthNumber
    props.data.dayStart=dayStart
    props.data.dayEnd=dayEnd

    console.log(dayStart)
    const renderCount = useRef( dayStart);  
    let newDayStart = dayStart
    let newDayEnd = dayEnd
    console.log(startDayInit)
    //const [startDay,setStartDay] = useState(dayStart)
    //const [endDay,setEndDay] = useState(dayEnd)

    return (
        <div className={styles.time_container}>
            <span className={styles.time_icon}>時</span>
            <div>
                <div className={styles.time_information}>
                    <div className={styles.time_item}>
                        <input
                            type="text"
                            placeholder="2000"
                            className={styles.time_input}
                            maxLength={4}
                            value={nowStartYear}
                            onChange={(e)=>{
                                setStartYear(Number(e.target.value))
                                if(!Number(e.target.value)){
                                    setStartYear(0)
                                }
                            }}
                            onBlur = {(e)=>{
                                if(e.target.value === "0"){
                                    setStartYear(year)
                                }
                                props.data.yearStart = e.target.value
                            }}
                        />
                        <div className={styles.time_bottom_word}>Year</div>
                    </div>
                    <div className={styles.time_item}>
                        <input
                            type="text"
                            placeholder="01"
                            className={styles.time_input}
                            maxLength={2}
                            value={monthStart}
                            onChange={(e)=>{
                                setMonthStart(Number(e.target.value))
                                if(!Number(e.target.value)){
                                    setMonthStart(0)
                                }
                            }}
                            onBlur = {(e)=>{
                                if(e.target.value === "0"){
                                    setMonthStart(monthNumber)
                                }
                                props.data.monthStart = e.target.value
                            }}
                        />
                        <div className={styles.time_bottom_word}>Month</div>
                    </div>
                    <div className={styles.time_item}>
                        <input
                            type="text"
                            placeholder="01"
                            className={styles.time_input}
                            maxLength={2}
                            value={dayStart}
                            onChange={(e)=>{setDayStart(e.target.value)}}
                            onBlur={(e)=>{
                                if(e.target.value===""){
                                    setDayStart(startDayInit.current)
                                }
                                props.data.dayStart = e.target.value
                            }}
                        />
                        <div className={styles.time_bottom_word}>Day</div>
                    </div>
                </div>
                <div className={styles.dividing_line_day}>|</div>
                <div className={styles.time_information}>
                    <div className={styles.time_item}>
                        <input
                            type="text"
                            placeholder="2000"
                            className={styles.time_input}
                            maxLength={4}
                            value={nowEndYear}
                            onChange={(e)=>{
                                setEndYear(Number(e.target.value))
                                if(!Number(e.target.value)){
                                    setEndYear(0)
                                }
                            }}
                            onBlur = {(e)=>{
                                if(e.target.value === "0"){
                                    setEndYear(year)
                                }
                                props.data.yearEnd = e.target.value
                            }}
                        />
                        <div className={styles.time_bottom_word}>Year</div>
                    </div>
                    <div className={styles.time_item}>
                        <input
                            type="text"
                            placeholder="01"
                            className={styles.time_input}
                            maxLength={2}
                            value={monthEnd}
                             onChange={(e)=>{
                                setMonthEnd(Number(e.target.value))
                                if(!Number(e.target.value)){
                                    setMonthEnd(0)
                                }
                            }}
                            onBlur = {(e)=>{
                                if(e.target.value === "0"){
                                    setMonthEnd(monthNumber)
                                }
                                props.data.monthEnd = e.target.value
                            }}
                        />
                        <div className={styles.time_bottom_word}>Month</div>
                    </div>
                    <div className={styles.time_item}>
                        <input
                            type="text"
                            placeholder="01"
                            className={styles.time_input}
                            maxLength={2}
                            value={dayEnd}
                            onChange={(e)=>{setDayEnd(e.target.value)}}
                            onBlur={(e)=>{
                                if(e.target.value===""){
                                    setDayEnd(endDayInit.current)
                                }
                                props.data.dayEnd = e.target.value
                            }
                        }
                        />
                        <div className={styles.time_bottom_word}>Day</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
