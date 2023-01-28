import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '/public/css/dayPage.module.css';
import { RootState } from '../store';

function DayBlock() {
    let clockArray = [];
    for (let i = 1; i < 24; i++) {
        let clock;
        if (i < 12) {
            clock = (
                <div className="clock" key={`cmd-${i}`}>
                    上午{i}
                </div>
            );
        } else {
            clock = (
                <div className="clock" key={`cmd-${i}`}>
                    下午{i}
                </div>
            );
        }
        clockArray.push(clock);
    }

    return (
        <div>
            <div>{clockArray}</div>
        </div>
    );
}

export default DayBlock;
