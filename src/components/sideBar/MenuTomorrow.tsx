import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import styled from 'styled-components';
import styles from '../../../public/css/sideBar.module.css';
import { commonData } from '../../page/MonthPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

//<InviteCard/>
const MenuTomorrow = (props: any) => {
    const monthNumber = useSelector(
        (state: RootState) => state.timeControlReducer.monthNumber
    );
    const year = useSelector(
        (state: RootState) => state.timeControlReducer.year
    );
    const [check, setCheck] = useState(false);
    const { isTagsArray } = useContext(commonData);
    const { setShowTagIndex } = useContext(commonData);
    const { setShowListDialog } = useContext(commonData);
    const tomorrowData = [...isTagsArray];
    let tomorrowDay = new Date().getDate() + 1;
    let tomorrowMonth = new Date().getMonth();
    let tomorrowYear = new Date().getFullYear();
    const thisMonthStartWeek: number = new Date(
        tomorrowYear,
        tomorrowMonth,
        1
    ).getDay();
    const thisDateId = thisMonthStartWeek + tomorrowDay - 1;
    const rowStartId = [1, 8, 15, 22, 29, 36];
    let dataArray: any = [];

    tomorrowData.forEach((element, index) => {
        const thisWeekStartId = rowStartId[Math.ceil(element.id / 7) - 1];
        const thisWeekEndId = thisWeekStartId + 6;
        if (
            element.dayStart <= tomorrowDay &&
            tomorrowDay <= element.dayEnd &&
            thisWeekStartId <= thisDateId &&
            thisDateId <= thisWeekEndId &&
            tomorrowYear === year &&
            tomorrowMonth+1 === monthNumber
        ) {
            console.log("tomorrowMonth === monthNumber",tomorrowMonth === monthNumber,tomorrowMonth,monthNumber)
            let item = (
                <li
                    id={element.index}
                    className={styles.item_container}
                    key={`menu-tomorrow-${index}`}
                    onClick={(e) => {
                        setShowTagIndex(element.index);
                        setShowListDialog(true);
                    }}
                >
                    <div>{element.title}</div>
                    <FontAwesomeIcon icon={faCalendarDays} />
                </li>
            );
            dataArray.push(item);
        }
    });

    return (
        <>
            <ul>
                <li className={styles.today_content}>
                    <input
                        type="radio"
                        className={styles.check_box}
                        id="tomorrow"
                        checked={check}
                        onClick={(e) => {
                            if (!check) {
                                setCheck(true);
                            } else {
                                setCheck(false);
                            }
                        }}
                        onChange={() => {}}
                    />
                    <ul className={styles.menu_item}>
                        {dataArray.length === 0 ? (
                            <li>
                                <div className={styles.no_item}>
                                    明日沒有任務
                                </div>
                            </li>
                        ) : null}
                        {dataArray}
                    </ul>
                </li>
            </ul>
        </>
    );
};

export default MenuTomorrow;

/* <li className={styles.item_container}
                            onClick={
                            (e)=>{}
}>
    <div>title名稱</div>
    <div className={styles.today_icon}>1</div>
</li> */
