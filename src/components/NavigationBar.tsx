import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { logOut } from '../store/action/logInControl';
import styles from '/public/css/navigationBar.module.css';
import ChangeTime from './navigation/ChangeTime';
import Search from './navigation/Search';
import ChangeTimeItem from './navigation/ChangeTimeItem';
import { NEXT_MONTH } from '../store/action/timeControl';
import { memberStatus } from '../';
import db from "../firebase/firebase"


const NavigationBar = () => {
    //const [memberStatus,setMemberStatus] = useState("登入")
    const {memberNowStatus} = useContext(memberStatus)
    const {setMemberStatus} = useContext(memberStatus)
    const {setMemberInformation} = useContext(memberStatus)
    //const { setSignInCardStatus} = useContext(memberStatus)
    //const { registerCardStatus} = useContext(memberStatus)
    //const { signInCardStatus} = useContext(memberStatus)
    const dispatch = useDispatch();


    const changeMemberStatus = (e:any) => {
        const result = db.leaveAccount()
        dispatch(logOut())
        result.then((msg)=>{
            if(msg === "success"){
                setMemberStatus(false)
            }
        })
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
                </div>
                <div className="nav_group" >
                    <ChangeTimeItem />
                    <div className={styles.login} onClick={changeMemberStatus} >登出</div>
                </div>
            </div>
        </nav>
        
    </>
    )
};

export default NavigationBar;
