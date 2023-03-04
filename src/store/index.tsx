import { createStore, combineReducers } from 'redux';
import timeControlReducer from './reducer/timeControl';
import logInReducer from './reducer/logInControl';

const allReducer = combineReducers({
    timeControlReducer,
    logInReducer
});
export type RootState = ReturnType<typeof allReducer>;

const store = createStore(allReducer);
export default store;

