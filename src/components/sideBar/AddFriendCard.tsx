import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from '/public/css/addFriendCard.module.css';
import db from '../../firebase/firebase';
import { memberStatus } from '../../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from "uuid";

const AddFriendCard = (props: any) => {
    const [inputEmail, setInputEmail] = useState('');
    const [resultMsg, setResultMsg] = useState('');
    const [color, setColor] = useState('#048517fa');
    const { memberInformation } = useContext(memberStatus);
    return (
        <>
            <div className={styles.addFriend_card_wrapper}>
                <div className={styles.addFriend_card_container}>
                    <div className={styles.close_container}>
                        <FontAwesomeIcon
                                className={styles.close_button}
                                icon={faXmark}
                                onClick={(e) => {
                                    props.setFriend(false);
                                }}
                            />
                    </div>
                    <div>
                        <div className={styles.card_title}>Please enter the friend's email</div>
                        <div className={styles.email_search_wrapper}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input
                                type="text"
                                placeholder="111@gmail.com"
                                className={styles.email_search_input}
                                maxLength={30}
                                value = {inputEmail}
                                onChange={(e) => {
                                    setInputEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div
                            className={styles.result_msg}
                            style={{ color: `${color}` }}
                        >
                            {resultMsg}
                        </div>
                        <div className={styles.add_button_wrapper}>
                            <div
                                className={styles.add_button}
                                onClick={(e) => {
                                    if(props.friendList.includes(inputEmail) || memberInformation === inputEmail){
                                        setResultMsg('You already have');
                                        setColor('rgb(255 3 3 / 98%)');
                                        return
                                    }
                                    const uuid =uuidv4()
                                    const result = db.addFriend(
                                        inputEmail,
                                        memberInformation,
                                        uuid
                                    );
                                    result.then((msg) => {
                                        if (msg) {
                                            setResultMsg('Success');
                                            setInputEmail(" ");
                                            setColor('rgb(7 255 44 / 98%)');
                                            let newFriendListIndex = props.friendListIndex
                                            newFriendListIndex[uuid] = inputEmail
                                            props.setFriendListIndex(newFriendListIndex)
                                            let newFriendEmail = [...props.friendList]
                                            newFriendEmail.push(inputEmail)
                                            props.setFriendList(newFriendEmail)
                                            
                                        } else {
                                            setResultMsg('Fail');
                                            setColor('rgb(255 3 3 / 98%)');
                                        }
                                    });
                                }}
                            >
                                ADD FRIEND
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddFriendCard;

// /<div className={styles.result_msg} style={{color:`${color}`}}>{resultMsg}</div>
