import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import { addTime, minusTime } from '../../store/action/timeControl';
import styles from '/public/css/navigationBar.module.css';

export default function ChangeTime() {
    const monthNumber = useSelector(
        (state: RootState) => state.timeControlReducer.monthNumber
    );
    const year = useSelector(
        (state: RootState) => state.timeControlReducer.year
    );
    const dispatch = useDispatch();
    return (
        <div className={styles.change_time}>
            <div
                className={styles.left_arrow_icon}
                onClick={() => {
                    dispatch(minusTime());
                }}
            >
                左
            </div>
            <div>
                {year}/{monthNumber}
            </div>
            <div
                className={styles.right_arrow_icon}
                onClick={() => {
                    dispatch(addTime());
                }}
            >
                右
            </div>
        </div>
    );
}

//<div className={styles.right_arrow_icon} onClick={ ()=> {dispatch(changeTime("嗨"));} }>右</div>
/*const ChangeTime = () => (
    <div className={styles.change_time}>
        <div className={styles.left_arrow_icon}>左</div>
        <div>2023/3</div>
        <div className={styles.right_arrow_icon}>右</div>
    </div>
);

export default ChangeTime;*/
