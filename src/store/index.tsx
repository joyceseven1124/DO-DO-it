import { createStore, combineReducers } from 'redux';
import timeControlReducer from './reducer/timeControl';

const allReducer = combineReducers({
    timeControlReducer,
});
export type RootState = ReturnType<typeof allReducer>;

const store = createStore(allReducer);
export default store;

