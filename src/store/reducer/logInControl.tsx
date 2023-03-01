import * as actions from '../action/logInControl';
import { Reducer } from 'redux';

const initState = {
    status: 'false',
    name: '',
    email: '',
};

const logInReducer = (state = initState, action: { [key: string]: any }) => {
    switch (action.type) {
        case actions.LOG_IN:
            return {
                status: true,
                name: action.payload.name,
                email: action.payload.email,
            };
        case actions.LOG_OUT:
            return {
                status: false,
                name: '',
                email: '',
            };
        default:
            return state;
    }
};
export default logInReducer;

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
