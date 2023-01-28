import * as actions from '../action/timeControl';
import { Reducer } from 'redux';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import weekday from 'dayjs/plugin/weekday';
import ChangeTime from '../../components/navigation/ChangeTime';
dayjs.extend(toObject);
dayjs.extend(weekday);
//判斷月份
//判斷星期
let monthDataArray: any[] = [];
let maxDay: number;

//const [monthIsValue, setMonth] = useState(0);

let nowTime = dayjs().toObject();
const initState = {
    monthNumber: dayjs().toObject().months + 1,
    year: dayjs().toObject().years,
    searchMonth: 0,
};

const timeControlReducer = (
    state = initState,
    action: { [key: string]: any }
) => {
    switch (action.type) {
        /*case  actions.NEXT_MONTH:
        console.log(action.payload.nowTime)
        return {
            ...state,
            todoList:[
                ...state.nowTime,
                action.payload.nowTime,
            ]
        }*/
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

/*const initState = {
    todoList: ['第一件事情', '第二件事情'],
  };

const todoReducer = (state = initState, action:any) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default todoReducer;*/
