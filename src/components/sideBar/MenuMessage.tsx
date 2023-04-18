import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import styles from '../../../public/css/sideBar.module.css';
import db from '../../firebase/firebase';
import { memberStatus } from '../..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const MenuItem = (props: any) => {
    const [check, setCheck] = useState(false);
    const { memberInformation } = useContext(memberStatus);

    useEffect(() => {
        if (memberInformation) {
            const result = db.getMessageData(memberInformation);

            result.then((msg) => {
                let msgArray: { [key: number]: number | string }[] = [];
                const keyArray = Object.keys(msg);
                const cleanMsg = keyArray.map((element: any) => {
                    if (keyArray.length === 0) {
                        return;
                    }
                    if (msg[element].length > 1) {
                        msgArray.push(msg[element][0]);
                        msgArray.push(msg[element][1]);
                    } else {
                        msgArray.push(msg[element]);
                    }
                });
                props.setInformationList(msgArray);
            });
        }
    }, [memberInformation]);

    let itemArray: any = [];
    const messageData = Object.keys(props.informationList);
    let prevTimeIndex = '';
    messageData.map((element: string) => {
        if (prevTimeIndex !== Object(props.informationList)[element].index) {
            prevTimeIndex = Object(props.informationList)[element].index;
            let item = (
                <li
                    className={styles.item_container}
                    id={element}
                    key={`message-${element}`}
                    onClick={(e) => {
                        props.setInformation(true);
                        props.setChooseInformationIndex(element);
                    }}
                >
                    <div>{Object(props.informationList)[element].title}</div>
                    <FontAwesomeIcon icon={faEnvelope} />
                </li>
            );
            itemArray.push(item);
        }
    });

    return (
        <>
            <ul>
                <li className={styles.sidebar_menu_content}>
                    <input
                        type="radio"
                        className={styles.check_box}
                        id="Message"
                        checked={check}
                        onClick={(e) => {
                            if (!check) {
                                setCheck(true);
                            } else {
                                setCheck(false);
                            }
                        }}
                        onChange={() => {}}
                    />

                    <label
                        htmlFor="Message"
                        className={styles.check_box_label}
                        id="tomorrow_label"
                    >
                        Invitation
                    </label>

                    <ul className={styles.menu_item}>
                        {itemArray.length === 0 ? (
                            <li>
                                <div className={styles.no_item}>
                                    Without notification
                                </div>
                            </li>
                        ) : null}
                        {itemArray}
                    </ul>
                </li>
            </ul>
        </>
    );
};

export default MenuItem;
