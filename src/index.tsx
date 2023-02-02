import {StrictMode} from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../public/css/index.css"
import store from './store';
import {Provider} from "react-redux"
import  MonthBlock  from './page/monthPage';
import DayBlock from './page/dayPage';
import NavigationBar from './components/NavigationBar';
import ToDoListDialogBox from "./components/ToDoListDialogBox"
import Register from "./components/navigation/member/Register"
import SingIn from './components/navigation/member/SignIn';
import AllToDoListDayDialogBox from './components/AllToDoListDayDialogBox';


const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <div>
            <NavigationBar/>
            <SingIn/>
            <Register/>
            <ToDoListDialogBox/>
            <AllToDoListDayDialogBox/>
            <BrowserRouter>
            <Routes>
                <Route  path="/" element={<MonthBlock />} />
                <Route  path="/day" element={<DayBlock/>} />
            </Routes>
            </BrowserRouter>
        </div>
      </Provider>
    </StrictMode>
  );
};
root.render(<App />);
