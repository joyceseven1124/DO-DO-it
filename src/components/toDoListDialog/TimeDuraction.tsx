import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/toDoListDialogBox.module.css';

export default function TimeInformation(){
    return(
        <div className={styles.time_container}>
            <span className={styles.time_icon}>時</span>
            <div>
                <div className={styles.time_information}>
                    <div className={styles.time_item}>
                        <input type="text" placeholder='2000'  className={styles.time_input} maxLength={4}/>
                        <div  className={styles.time_bottom_word}>Year</div>
                    </div>
                    <div className={styles.time_item}>
                        <input type="text" placeholder='01'  className={styles.time_input} maxLength={2}/>
                        <div  className={styles.time_bottom_word}>Month</div>
                    </div>
                    <div className={styles.time_item}>
                        <input type="text" placeholder='01'  className={styles.time_input} maxLength={2}/>
                        <div  className={styles.time_bottom_word}>Day</div>
                    </div>
                </div>
                <div className={styles.dividing_line_day}>|</div>
                <div className={styles.time_information}>
                    <div className={styles.time_item}>
                        <input type="text" placeholder='2000'  className={styles.time_input} maxLength={4}/>
                        <div  className={styles.time_bottom_word}>Year</div>
                    </div>
                    <div className={styles.time_item}>
                        <input type="text" placeholder='01'  className={styles.time_input} maxLength={2}/>
                        <div  className={styles.time_bottom_word}>Month</div>
                    </div>
                    <div className={styles.time_item}>
                        <input type="text" placeholder='01'  className={styles.time_input} maxLength={2}/>
                        <div  className={styles.time_bottom_word}>Day</div>
                    </div>
                </div>
            </div>
        </div>
    )

}