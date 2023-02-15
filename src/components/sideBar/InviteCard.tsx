import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from '/public/css/InviteCard.module.css';


const InviteCard = (props:any) =>{
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
                <h2>邀請卡</h2>
                <h3 className={styles.invite_receiver}>Dear 999</h3>
                <div className={styles.invite_pic}>p</div>
                <div className={styles.invite_information}>
                    <h3>From 111</h3>
                    <div>活動名稱:</div>
                    <div>活動時間:</div>
                    <div>活動細節:</div>
                </div>
                <div className={styles.buttons_container}>
                    <button className={styles.invite_button}>好呀</button>
                    <button id='reject' className={styles.invite_button}>不行</button>
                </div>
               
            </div>
        </div>
        </>
    )
}

export default InviteCard