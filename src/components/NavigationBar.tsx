import React, { useContext, useEffect, useState } from 'react';
import styles from '/public/css/navigationBar.module.css';
import ChangeTime from './navigation/ChangeTime';
import Search from './navigation/Search';
import ChangeTimeItem from './navigation/ChangeTimeItem';
import { NEXT_MONTH } from '../store/action/timeControl';
import { memberStatus } from '..';
import Register from "./navigation/member/Register"
import SingIn from './navigation/member/SignIn';
import db from "../firebase/firebase"


const NavigationBar = () => {
    //const [memberStatus,setMemberStatus] = useState("登入")
    const {memberNowStatus} = useContext(memberStatus)
    const {setMemberStatus} = useContext(memberStatus)
    //const { setSignInCardStatus} = useContext(memberStatus)
    //const { registerCardStatus} = useContext(memberStatus)
    //const { signInCardStatus} = useContext(memberStatus)
    const [signInCardStatus,setSignInCardStatus] = useState(false)
    const [registerCardStatus,setRegisterCardStatus] = useState(false)
    const[logIn,setLogIn] =useState("登出")
    console.log(memberNowStatus)
    useEffect(()=>{
        if(!memberNowStatus){
            setLogIn("登入")
        }else{
            setLogIn("登出")
        }
    },[memberNowStatus])

    const changeMemberStatus = (e:any) => {
        if(!memberNowStatus){
            setSignInCardStatus(true)
        }else{
            const result = db.leaveAccount()
            result.then((msg)=>{
                if(msg === "success"){
                    setMemberStatus(false)
                    setLogIn("登入")
                }
            })

        }
        
    }

    return(
    <>
        <nav className={styles.nav_container}>
            <div  className={styles.nav_bar}>
                <div className="nav_group">
                    <div className={styles.app_icon}>主</div>
                </div>
                <div className="nav_group">
                    <ChangeTime />
                    <Search />
                </div>
                <div className="nav_group" >
                    <ChangeTimeItem />
                    <div className={styles.login} onClick={changeMemberStatus} >{logIn}</div>
                </div>
            </div>
        </nav>
        {signInCardStatus? (<>
        <SingIn setRegister={setRegisterCardStatus} 
                registerStatus={registerCardStatus}
                setSignInCard={setSignInCardStatus}
                signStatus={signInCardStatus}/>
        </>) : null}
        {registerCardStatus? (<>
        <Register setRegister={setRegisterCardStatus} 
                  registerStatus={registerCardStatus}
                  setSignInCard={setSignInCardStatus}
                  signStatus={signInCardStatus}/></>) : null}
    </>
    )
};

export default NavigationBar;
