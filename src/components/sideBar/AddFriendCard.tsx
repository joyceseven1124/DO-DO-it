import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from '/public/css/addFriendCard.module.css';
import db from "../../firebase/firebase"
import {memberStatus} from "../../index"


const AddFriendCard = (props:any) =>{
    const [inputEmail,setInputEmail] = useState("")
    const [resultMsg,setResultMsg] = useState("")
    const [color,setColor] = useState("#048517fa")
    const {memberInformation} = useContext(memberStatus)
    return(
        <>
            <div className={styles.addFriend_card_wrapper}>
                <div className={styles.addFriend_card_container}>
                    <div className={styles.close_container}>
                        <div className={styles.close_button} onClick={
                            (e) =>{props.setFriend(false)}
                        }>關</div>
                    </div>
                    <div>
                        <div className={styles.addFriend_pic}>p</div>
                        <div>請輸入對方的email</div>
                        <input  type="text" 
                                placeholder='111@gmail.com'
                                className={styles.email_search_input}
                                maxLength={30}
                                onChange={(e)=>{
                                    setInputEmail(e.target.value)
                                }}
                                />
                        <div className={styles.result_msg} style={{color:`${color}`}}>{resultMsg}</div>
                        <div className={styles.add_button_wrapper}>
                            <div className={styles.add_button}
                                 onClick = {(e)=>{
                                    console.log("是否有此人")
                                    console.log(inputEmail)
                                    const result = db.addFriend(inputEmail,memberInformation)
                                    result.then((msg)=>{
                                        if(msg){
                                            setResultMsg("恭喜結交一名星際探警")
                                            setColor("#048517fa")
                                        }else{
                                            setResultMsg("逼波逼波~查無此人")
                                            setColor("#ae0000fa")
                                        }
                                    })
                                 }}
                            >加好友</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddFriendCard

// /<div className={styles.result_msg} style={{color:`${color}`}}>{resultMsg}</div>