import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from '/public/css/addFriendCard.module.css';
import db from '../../firebase/firebase';
import { memberStatus } from '../../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
                                    const result = db.addFriend(
                                        inputEmail,
                                        memberInformation
                                    );
                                    result.then((msg) => {
                                        if (msg) {
                                            setResultMsg('新增成功');
                                            setColor('#048517fa');
                                        } else {
                                            setResultMsg('查無此人');
                                            setColor('#ae0000fa');
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
