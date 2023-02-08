import React from 'react';
import styles from '/public/css/navigationBar.module.css';
import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(toObject);
dayjs.extend(weekday);

let ChangeTimeItem = () => (
    <div className={styles.change_time_type}>
        <div id="change_time_type_button">時間表</div>
        <div>
            <ul id="change_time_type_menu" className={styles.time_type_items}>
                <ol>天</ol>
                <ol>週</ol>
                <ol>月</ol>
                <ol>年</ol>
                <ol>行程表</ol>
            </ul>
        </div>
    </div>
);

export default ChangeTimeItem;
