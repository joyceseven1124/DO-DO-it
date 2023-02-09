import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '/public/css/monthPage.module.css';
import MonthCell from './monthPage/MonthCell';
import { RootState } from '../store';


function MonthBlock() {
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

export default MonthBlock;
