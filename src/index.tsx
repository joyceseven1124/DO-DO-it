import {StrictMode, useEffect, useState,createContext} from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../public/css/index.css"
import store from './store';
import {Provider} from "react-redux"
import  MonthBlock  from './page/monthPage';
import DayBlock from './page/dayPage';
import NavigationBar from './components/NavigationBar';
import ToDoListDialogBox from "./page/monthPage/ToDoListDialogBox"
import Register from "./components/navigation/member/Register"
import SingIn from './components/navigation/member/SignIn';
import AllToDoListDayDialogBox from './components/AllToDoListDayDialogBox';
import Footer from './components/Footer';

export const memberStatus = createContext({
  memberNowStatus:undefined,
  setMemberStatus:undefined,
  //signInCardStatus:undefined,
  //setSignInCardStatus:undefined,
  //registerCardStatus:undefined,
  //setRegisterCardStatus:undefined
})

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
`
const root = ReactDOM.createRoot(document.getElementById('root'));
//<ToDoListDialogBox/>
//</StrictMode>
const App = () => {
  let memberRoute
  const [memberNowStatus,setMemberStatus] = useState(false)
  //const [signInCardStatus,setSignInCardStatus] = useState(false)
  //const [registerCardStatus,setRegisterCardStatus] = useState(false)
 
  return (
      <Provider store={store}>
        <memberStatus.Provider
          value = {{memberNowStatus,
                    setMemberStatus}}>
          <MainContainer>
              <NavigationBar/>
              <AllToDoListDayDialogBox/>
              <BrowserRouter>
              <Routes>
                  <Route  path="/" element={<MonthBlock />} />
                  <Route  path="/day" element={<DayBlock/>} />
              </Routes>
              </BrowserRouter>
              <Footer/>
          </MainContainer>
        </memberStatus.Provider>
      </Provider>
    
  );
};
root.render(<App />);
