import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from '/public/css/addFriendCard.module.css';


const AddFriendCard = (props:any) =>{
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
                                maxLength={30}/>
                        <div className={styles.add_button_wrapper}>
                            <div className={styles.add_button}>加好友</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddFriendCard