import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { logOut } from '../store/action/logInControl';
import styles from '/public/css/navigationBar.module.css';
import ChangeTime from './navigation/ChangeTime';
import { NEXT_MONTH } from '../store/action/timeControl';
import { memberStatus } from '../';
import SideBar from './SideBar';
import db from "../firebase/firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {faAngleUp} from '@fortawesome/free-solid-svg-icons'



const NavigationBar = (props:any) => {
    const {setMemberStatus} = useContext(memberStatus)
    const {setMemberInformation} = useContext(memberStatus)
    const {memberInformation} = useContext(memberStatus)
    const {memberName} = useContext(memberStatus)
    const {setMemberName} = useContext(memberStatus)
    const [openMenu,setOpenMenu] = useState(false)
    const [appIconButton,setAppIconButton] = useState(false)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(memberInformation){
            const result = db.getMemberInformation(memberInformation)
            result.then((msg)=>{
                setMemberName(msg.name)
            })
        }

    },[memberInformation])

    const changeMemberStatus = (e:any) => {
        const result = db.leaveAccount()
        dispatch(logOut())
        result.then((msg)=>{
            if(msg === "success"){
                setMemberStatus(false)
            }
        })
    }

    const handleRWD=()=>{
        if(window.innerWidth <= 1200){
            setAppIconButton(true)
        }
    }

    useEffect(()=>{
        window.addEventListener('resize',handleRWD);
        handleRWD();
        return(()=>{
            window.removeEventListener('resize',handleRWD);
        })
    },[]);

    return(
    <>
        <nav className={styles.nav_container}>
            <div  className={styles.nav_bar}>
                <button className={styles.nav_group_icon} 
                    onClick={appIconButton ? ((e)=>{
                                if(openMenu){
                                    props.setSideBarStatus("none")
                                    setOpenMenu(false)
                                }else{
                                    props.setSideBarStatus("block")
                                    setOpenMenu(true)
                                }
                            }):null}>
                    <div className={styles.app_icon}>主</div>
                    <FontAwesomeIcon className={styles.arrow_down_icon} icon={!openMenu?faAngleDown:faAngleUp} />

                </button>
                <div className="nav_group">
                    <ChangeTime/>
                </div>
                <div className="nav_group" >
                    <div className={styles.login} onClick={changeMemberStatus} >Log out</div>
                </div>
            </div>
        </nav>
        
    </>
    )
};

export default NavigationBar;
//<div className={styles.member_name}>{memberName}</div>