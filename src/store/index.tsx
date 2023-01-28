import { createStore, combineReducers } from 'redux';
import timeControlReducer from './reducer/timeControl';

const allReducer = combineReducers({
    timeControlReducer,
});
export type RootState = ReturnType<typeof allReducer>;

const store = createStore(allReducer);
export default store;

/*import { createStore } from 'redux';
import todoReducer from '../reducer/timeControl';

export type RootState = ReturnType<typeof todoReducer>;
const store = createStore(todoReducer);
export default store;*/

//export default store;
