import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '/public/css/monthPage.module.css';
import MonthCell from './monthPage/DayCell';
import { RootState } from '../store';


function MonthBlock() {
    /*const searchMonth = useSelector((state: RootState) =>
        console.log(state.timeControlReducer.searchMonth)
    );*/
    return (
        <div className={styles.monthPage_container}>
            <div>
                <div className={styles.week_container}>
                    <ul className={styles.week_title}>
                        <ol className="week">MON</ol>
                        <ol className="week">TUE</ol>
                        <ol className="week">WED</ol>
                        <ol className="week">THU</ol>
                        <ol className="week">FRI</ol>
                        <ol className="week">SAT</ol>
                        <ol className="week">SUN</ol>
                    </ul>
                </div>
                <MonthCell />
            </div>
        </div>
    );
}

/*const MonthBlock = () => (
    <div>
        <ul className={styles.week_title}>
            <ol className="week">MON</ol>
            <ol className="week">TUE</ol>
            <ol className="week">WED</ol>
            <ol className="week">THU</ol>
            <ol className="week">FRI</ol>
            <ol className="week">SAT</ol>
            <ol className="week">SUN</ol>
        </ul>
        <MonthCell/>
    </div>
);*/

export default MonthBlock;


/*<div className={styles.testMom}>
                    <MonthCell />
                    <div id = "test"className={styles.test}>
                        <MonthCell/>
                    </div>
</div>*/