import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(toObject);
dayjs.extend(weekday);

function findMaxDay(monthNumber: number) {
    const year: number = useSelector(
        (state: RootState) => state.timeControlReducer.year
    );
    if (monthNumber === 0) {
        monthNumber = 12;
    }
    const bigMonth = [1, 3, 5, 7, 8, 10, 12];
    let maxDay: number;
    if (bigMonth.includes(monthNumber)) {
        maxDay = 31;
    } else if (monthNumber === 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            maxDay = 29;
        } else {
            maxDay = 28;
        }
    } else {
        maxDay = 30;
    }
    return maxDay;
}

export default findMaxDay;
