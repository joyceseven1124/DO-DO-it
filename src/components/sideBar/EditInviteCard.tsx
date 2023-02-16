import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from '/public/css/editInviteCard.module.css';


const EditInviteCard = (props:any) =>{
    const [color,setColor] = useState("#f0900a")
    let description:string
    let title:string
    let startTime:string
    let endTime:string

    const sendInvite = (e:any)=>{
        let startTimeArray = startTime.split("/")
        //檢查時間串是否為三且正確是數字，用正規
        console.log(startTimeArray.length)
    }

    return(
        <>
            <div className={styles.edit_invite_wrapper}>
                <div className={styles.edit_invite_container}>
                    <div>
                        <h2>INVITATION CARD</h2>
                        <div className={styles.edit_invite_decorate}></div>
                        <div>TO:</div>
                        <div className={styles.friend_email}>{props.chooseEmail}</div>
                        <div>為夥伴選個標籤顏色吧</div>
                        <div className={styles.color_selector_wrapper}>
                            <div>顏色:</div>
                            <input  className={styles.color_selector} 
                                    type="color"
                                    style={{backgroundColor:`${color}`}}
                                    onChange={(e)=>{
                                        e.target.click()
                                        setColor(e.target.value)
                                    }}/>
                        </div>
                    </div>
                    <div className={styles.edit_invite_information}>

                        <div className={styles.close_container}
                             onClick={(e)=>{props.setEditInvite(false)}}>
                            <div className={styles.close_button}>關</div>
                        </div>

                        <div className={styles.edit_invite_title_wrapper}>
                            <div className={styles.edit_invite_title}>活動名稱</div>
                            <input placeholder='20字以內' maxLength={20}/>
                        </div>

                        <div className={styles.edit_invite_day_word_wrapper}>
                            <div>起始時間</div>
                            <div>結束時間</div>
                        </div>

                        <div className={styles.edit_invite_day_wrapper}>
                            <input  placeholder='2022/10/10' 
                                    className={styles.edit_invite_day} 
                                    maxLength={10}
                                    onChange={(e)=>{
                                        startTime = e.target.value
                                    }}/>
                            <div>--</div>
                            <input  placeholder='2022/10/10' 
                                    className={styles.edit_invite_day} 
                                    maxLength={10}
                                    onChange={(e)=>{
                                        endTime = e.target.value
                                    }}/>
                        </div>

                        <div className={styles.edit_invite_description_wrapper}>
                            <div>活動細節</div>
                            <textarea 
                            className={styles.edit_invite_description}
                            placeholder='100字以內' rows={3}
                            maxLength={100}
                            onChange={(e)=>{
                                description = e.target.value
                            }}/>
                        </div>
                        <div className={styles.send_invite_button_wrapper}>
                            <div className={styles.send_invite_button}
                                 onClick={sendInvite}>傳送</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditInviteCard