import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from '/public/css/InviteCard.module.css';


const InviteCard = (props:any) =>{
    const messageData = props.informationList[props.chooseInformationIndex]
    const month = ["January" ,"February", "March","April", "May", "June", "July"
                    ," August", "September" ,"October", "November", "December"]
    const monthWord = month[messageData.monthStart-1]

    console.log(messageData)
    return(
        <>
        <div className={styles.invite_wrapper}>
            <div className={styles.invite_content}>
                <div className={styles.close_container}
                     onClick={(e)=>{
                        props.setInformation(false)
                     }}>
                    <div className={styles.close_button}>關</div>
                </div>
                <h2>Invitation Card</h2>
                
                <div className={styles.invite_pic}>p</div>
                <div className={styles.invite_information}>
                    <div className={styles.title_and_name_container}>
                        <div className={styles.invite_receiver}>Dear </div>
                        <div>
                            <div className={styles.item_title_word}>Invite you to</div>
                            <div>{messageData.title}</div>
                        </div>
                    </div>
                    <div className={styles.time_and_description_container}>
                        <div className={styles.time_container}>
                            <div className={styles.date_weekday}>SATURDAY</div>
                            <div>{monthWord}</div>
                            <div className={styles.date_number}>{messageData.dayStart}</div>
                            <div>{messageData.yearStart}</div>
                        </div>
                        <div className={styles.schedule_content}>
                            <div>SCHEDULE</div>
                            {}
                            <div className={styles.schedule_content_word}>2023/8/6-2022/8/9</div>
                            <div className={styles.schedule_content_word}>{messageData.description}111122</div>
                        </div>
                    </div>
                    <div className={styles.send_name_container}>
                        <div className={styles.send_name}>BY:111</div>
                        <div>Email: {messageData.sendEmail}</div>
                    </div>
                </div>
                <div className={styles.buttons_container}>
                    <button id='reject'  className={styles.invite_button}>NO</button>
                    <button id="agree" className={styles.invite_button}>OK!</button>
                </div>
               
            </div>
        </div>
        </>
    )
}

export default InviteCard