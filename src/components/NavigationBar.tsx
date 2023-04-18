import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '/public/css/navigationBar.module.css';
import ChangeTime from './navigation/ChangeTime';
import { memberStatus } from '../';
import db from "../firebase/firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {faAngleUp} from '@fortawesome/free-solid-svg-icons'



const NavigationBar = (props:any) => {
    const {setMemberStatus} = useContext(memberStatus)
    const {memberInformation} = useContext(memberStatus)
    const {setMemberName} = useContext(memberStatus)
    const [openMenu,setOpenMenu] = useState(false)
    const [appIconButton,setAppIconButton] = useState(false)

    useEffect(()=>{
        if(memberInformation){
            const result = db.getMemberInformation(memberInformation)
            result.then((msg:{[key:string]:string})=>{
                if(!msg.result){
                    setMemberName(msg.name)
                }
            })
        }

    },[memberInformation])

    const changeMemberStatus = (e:any) => {
        const result = db.leaveAccount()
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
                                    props.setHiddenSideBarButton("none")
                                    props.setSideBarStatus(false)
                                    setOpenMenu(false)
                                }else{
                                    props.setHiddenSideBarButton("block")
                                    props.setSideBarStatus(true)
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