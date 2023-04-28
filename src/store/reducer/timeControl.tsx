import * as actions from '../action/timeControl';
import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(toObject);
dayjs.extend(weekday);

const initState = {
    monthNumber: dayjs().toObject().months + 1,
    year: dayjs().toObject().years,
    searchMonth: 0,
};

const timeControlReducer = (
    state = initState,
    action: { [key: string]: string }
) => {
    switch (action.type) {
        case actions.NEXT_MONTH:
            if (state.monthNumber === 12) {
                state.monthNumber = 1;
                state.year = state.year + 1;
            } else {
                state.monthNumber = state.monthNumber + 1;
            }
            return {
                monthNumber: state.monthNumber,
                searchMonth: state.searchMonth + 1,
                year: state.year,
            };
        case actions.PREV_MONTH:
            if (state.monthNumber === 1) {
                state.monthNumber = 12;
                state.year = state.year - 1;
            } else {
                state.monthNumber = state.monthNumber - 1;
            }
            return {
                monthNumber: state.monthNumber,
                searchMonth: state.searchMonth - 1,
                year: state.year,
            };
        default:
            return state;
    }
};
export default timeControlReducer;
