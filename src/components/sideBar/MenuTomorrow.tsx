import React, { useState, useContext, useEffect } from 'react';
import styles from '../../../public/css/sideBar.module.css';
import { commonData } from '../../page/MonthPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const MenuTomorrow = () => {
    const [check, setCheck] = useState(false);
    const { isTagsArray } = useContext(commonData);
    const { setShowTagIndex } = useContext(commonData);
    const { setShowListDialog } = useContext(commonData);
    const tomorrowData = [...isTagsArray];
    let tomorrowDay = new Date().getDate() + 1;
    let tomorrowMonth = new Date().getMonth();
    let tomorrowYear = new Date().getFullYear();
    let dataArray: JSX.Element[] = [];
    let checkRepeatIndex = '';

    tomorrowData.forEach((element, index) => {
        const dateStart = new Date(
            `${element.yearStart}-${element.monthStart}-${element.dayStart}`
        );
        const dateEnd = new Date(
            `${element.yearEnd}-${element.monthEnd}-${element.dayEnd}`
        );
        const dateToday = new Date(
            `${tomorrowYear}-${tomorrowMonth + 1}-${tomorrowDay}`
        );
        if (dateStart <= dateToday && dateToday <= dateEnd) {
            if (checkRepeatIndex === element.index) {
                checkRepeatIndex = element.index;
                return;
            }
            checkRepeatIndex = element.index;
            let item = (
                <li
                    id={element.index}
                    className={styles.item_container}
                    key={`menu-tomorrow-${element.index}`}
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
                <li className={styles.sidebar_menu_content}>
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

                    <label
                        htmlFor="tomorrow"
                        className={styles.check_box_label}
                        id="tomorrow_label"
                    >
                        Tomorrow's task
                    </label>

                    <ul className={styles.menu_item}>
                        {dataArray.length === 0 ? (
                            <li>
                                <div className={styles.no_item}>
                                    Currently without any plans
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
