import React, { useEffect, useState, useRef,useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/index';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/toDoListDialogBox.module.css';
import { tagData } from '../MonthCell';

export default function TimeInformation(props:any) {
    const { tagStartCell } = useContext(tagData);
    const {tagEndCell} = useContext(tagData);
    const { dayStart } = useContext(tagData);
    const { dayEnd } = useContext(tagData);
    let monthNumber = useSelector(
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
    let amendMonthStart = monthNumber
    let amendMonthEnd = monthNumber
    if(tagStartCell <7 && dayStart>7){
        amendMonthStart = amendMonthStart -1
    }
    if(tagEndCell<7 && dayEnd>7){
        amendMonthEnd=amendMonthEnd -1
    }
    if(tagStartCell > 28 && dayStart<7){
        amendMonthStart  = amendMonthStart +1
    }
    if(tagEndCell>28 && dayEnd<7){
        amendMonthEnd = amendMonthEnd+1
    }
    props.data.yearStart =year
    props.data.yearEnd=year
    props.data.monthStart=monthNumber
    props.data.monthEnd=monthNumber
    props.data.dayStart=dayStart
    props.data.dayEnd=dayEnd



    return (
        <div className={styles.time_container}>
            <span className={styles.time_icon}>時</span>
            <div>
                <div className={styles.time_information}>
                    <div className={styles.time_item}>
                        <div className={styles.time_input}>{nowStartYear}</div>
                        <div className={styles.time_bottom_word}>Year</div>
                    </div>
                    <div className={styles.time_item}>
                        <div className={styles.time_input}>{amendMonthStart}</div>
                        <div className={styles.time_bottom_word}>Month</div>
                    </div>
                    <div className={styles.time_item}>
                        <div className={styles.time_input}>{dayStart}</div>
                        <div className={styles.time_bottom_word}>Day</div>
                    </div>
                </div>
                <div className={styles.dividing_line_day}>|</div>
                <div className={styles.time_information}>
                    <div className={styles.time_item}>
                        <div className={styles.time_input}>{nowStartYear}</div>
                        <div className={styles.time_bottom_word}>Year</div>
                    </div>
                    <div className={styles.time_item}>
                        <div className={styles.time_input}>{amendMonthEnd}</div>
                        <div className={styles.time_bottom_word}>Month</div>
                    </div>
                    <div className={styles.time_item}>
                        <div className={styles.time_input}>{dayEnd}</div>
                        <div className={styles.time_bottom_word}>Day</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
