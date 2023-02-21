import {StrictMode, useEffect, useState,createContext} from 'react';
import { getAuth, 
         createUserWithEmailAndPassword ,
         signInWithEmailAndPassword,
         onAuthStateChanged,
         signOut } from "firebase/auth";
import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes ,useNavigate,Navigate} from "react-router-dom";
import "../public/css/index.css"
import store from './store';
import { RootState } from './store/index';
import {Provider, useSelector} from "react-redux"
import db from "./firebase/firebase"
import DayBlock from './page/dayPage';
import LonInPage from './page/LogInPage';
import Footer from './components/Footer';
import MonthPage from './page/MonthPage';

export const memberStatus = createContext({
  memberNowStatus:undefined,
  setMemberStatus:undefined,
  memberInformation:undefined,
  setMemberInformation:undefined,
  thisMonthData:undefined,
  setThisMonthData:undefined,
  memberName:undefined,
  setMemberName:undefined
})

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
`
const root = ReactDOM.createRoot(document.getElementById('root'));
//<ToDoListDialogBox/>
//</StrictMode>
const App = () => {
  /*const memberStatus = useSelector(
        (state: RootState) => state.logInReducer.status
    );*/
  let memberRoute
  const [memberNowStatus,setMemberStatus] = useState(true)
  const [memberInformation,setMemberInformation] = useState("")
  const [thisMonthData,setThisMonthData] = useState([])
  const [memberName,setMemberName] = useState("")

  //const navigate = useNavigate()
  //const navigate = useNavigate();
  //const [signInCardStatus,setSignInCardStatus] = useState(false)
  //const [registerCardStatus,setRegisterCardStatus] = useState(false)
  
    
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
  if (user) {
    setMemberStatus(true)
    setMemberInformation(user.email)
  }else{
    setMemberStatus(false)
    //navigate("/logIn")
  }
  })
    //setMemberStatus(false)


 
  return (
      <Provider store={store}>
        <memberStatus.Provider
          value = {{memberNowStatus,
                    setMemberStatus,
                    setMemberInformation,
                    memberInformation,
                    thisMonthData,
                    setThisMonthData,
                    memberName,
                    setMemberName
                    }}>
          <MainContainer>
              <BrowserRouter>
              <Routes>
                <Route path="/day" element={memberNowStatus ? <DayBlock/> : <Navigate to="/login" replace />} />
                <Route path="/logIn" element={<LonInPage/>}/>
                <Route  path="/" element={memberNowStatus ? <MonthPage/> : <Navigate to="/login" replace/>} />
              </Routes>
              </BrowserRouter>
          </MainContainer>
        </memberStatus.Provider>
      </Provider>
    
  );
};
root.render(<App />);
//<Route  path="/home" element={memberNowStatus ? <MonthPage/> : <Navigate to="/login" replace/>} />