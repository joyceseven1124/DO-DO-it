import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import { addTime, minusTime } from '../../store/action/timeControl';
import styles from '/public/css/navigationBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft} from '@fortawesome/free-solid-svg-icons'


export default function ChangeTime(props:any) {
    const monthNumber = useSelector(
        (state: RootState) => state.timeControlReducer.monthNumber
    );
    const year = useSelector(
        (state: RootState) => state.timeControlReducer.year
    );
    const dispatch = useDispatch();
    return (
        <div className={styles.change_time}>
            <FontAwesomeIcon className={styles.arrow_icon} icon={faAngleLeft} 
                onClick={() => {
                    dispatch(minusTime());
                }}/>

            <div>
                {year}/{monthNumber}
            </div>

            <FontAwesomeIcon className={styles.arrow_icon} icon={faAngleRight} 
                onClick={() => {
                    dispatch(addTime());
                }}
            />
          
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
