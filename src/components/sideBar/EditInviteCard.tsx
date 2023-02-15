import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from '/public/css/editInviteCard.module.css';


const EditInviteCard = (props:any) =>{
    return(
        <>
            <div className={styles.edit_invite_wrapper}>
                <div className={styles.edit_invite_container}>
                    <div>
                        <div className={styles.edit_invite_decorate}></div>
                        <h1>TO:<span>111</span></h1>
                        <div>為對方選個標籤顏色吧</div>
                        <div className={styles.color_selector_wrapper}>
                            <div>顏色:</div>
                            <input className={styles.color_selector} type="color"/>
                        </div>
                    </div>
                    <div className={styles.edit_invite_information}>

                        <div className={styles.close_container}
                             onClick={(e)=>{props.setEditInvite(false)}}>
                            <div className={styles.close_button}>關</div>
                        </div>

                        <div className={styles.edit_invite_title_wrapper}>
                            <div className={styles.edit_invite_title}>活動名稱</div>
                            <input placeholder='20字以內'/>
                        </div>

                        <div className={styles.edit_invite_day_word_wrapper}>
                            <div>起始時間</div>
                            <div>結束時間</div>
                        </div>

                        <div className={styles.edit_invite_day_wrapper}>
                            <input placeholder='2022/10/10' className={styles.edit_invite_day}/>
                            <div>--</div>
                            <input placeholder='2022/10/10' className={styles.edit_invite_day}/>
                        </div>

                        <div className={styles.edit_invite_description_wrapper}>
                            <div>活動細節</div>
                            <textarea 
                            className={styles.edit_invite_description}
                            placeholder='100字以內' rows={3}/>
                        </div>
                        <div className={styles.send_invite_button_wrapper}>
                            <div className={styles.send_invite_button}>傳送</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditInviteCard