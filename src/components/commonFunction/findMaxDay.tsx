import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';


function IsLeapYear(year:number){
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return true
    } else {
        return false
    }
}

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
        const resultLeapYear = IsLeapYear(year)
        if (resultLeapYear) {
            maxDay = 29;
        } else {
            maxDay = 28;
        }
    } else {
        maxDay = 30;
    }
    return maxDay;
}

export default {findMaxDay,IsLeapYear};
