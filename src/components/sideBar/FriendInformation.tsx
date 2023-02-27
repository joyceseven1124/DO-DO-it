import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from '/public/css/friendInformation.module.css';
import { memberStatus } from '../..';
import { commonData } from '../../page/MonthPage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import db from "../../firebase/firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson } from '@fortawesome/free-solid-svg-icons'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faXmark} from '@fortawesome/free-solid-svg-icons'

const FriendInformation = (props:any) =>{
    const [friendName,setFriendName] = useState("")
    const {memberInformation} = useContext(memberStatus)
    const {memberName} = useContext(memberStatus)
    const monthNumber = useSelector(
        (state: RootState) => state.timeControlReducer.monthNumber
    );
    const year = useSelector(
        (state: RootState) => state.timeControlReducer.year
    );
    console.log("這是誰的emai;",props.chooseEmail)


    useEffect(()=>{
        const friendName = db.getFriendInformation(props.chooseEmail)
        console.log(friendName)
        friendName.then((msg)=>{
            if(msg.name){
                console.log("的確有此人")
                setFriendName(msg.name)
            }
            console.log(msg)
        })

    },[])

   return(
    <div className={styles.friend_information_wrapper}>
        <div className={styles.friend_information_container}>
                <div className={styles.container}>
                    <div className={styles.inner_w}>
                        <div className={styles.inner}>
                            <FontAwesomeIcon className={styles.close_icon} icon={faXmark} 
                                    onClick={(e)=>{
                                        props.setFriendInformationCard(false)
                                    }}
                                />
                            <div className={styles.inner_image}>
                                <div className={styles.friend_pic}></div>
                            </div>
                            <div className={styles.inner_text}>
                                <h1>{friendName}</h1>
                                <div className={styles.friend_email_wrapper}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <div className={styles.friend_email}>{props.chooseEmail}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>

   )

}

export default FriendInformation

