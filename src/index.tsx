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
import LonInPage from './page/LogInPage';
import RegisterPage from "./page/RegisterPage"
import Footer from './components/Footer';
import MonthPage from './page/MonthPage';
import FrontPage from "./page/FrontPage"

export const memberStatus = createContext({
  memberNowStatus:undefined,
  setMemberStatus:undefined,
  memberInformation:undefined,
  setMemberInformation:undefined,
  memberName:undefined,
  setMemberName:undefined
})

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
`
const root = ReactDOM.createRoot(document.getElementById('root'));
const App = () => {
  let memberRoute
  const [memberNowStatus,setMemberStatus] = useState(true)
  const [memberInformation,setMemberInformation] = useState("")
  const [memberName,setMemberName] = useState("")

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
  if (user) {
    setMemberStatus(true)
    setMemberInformation(user.email)
  }else{
    setMemberStatus(false)
  }
  })

  return (
      <Provider store={store}>
        <memberStatus.Provider
          value = {{memberNowStatus,
                    setMemberStatus,
                    setMemberInformation,
                    memberInformation,
                    memberName,
                    setMemberName
                    }}>
          <MainContainer>
              <BrowserRouter>
              <Routes>
                <Route path="/" element={<FrontPage/>}/>
                <Route path="/logIn" element={<LonInPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route  path="/calender" element={memberNowStatus ? <MonthPage/> : <Navigate to="/login" replace/>} />
              </Routes>
              </BrowserRouter>
          </MainContainer>
        </memberStatus.Provider>
      </Provider>
    
  );
};
root.render(<App />);
