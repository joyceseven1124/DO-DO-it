import React, { useState, useContext, useEffect } from 'react';
import styles from '../../../public/css/sideBar.module.css';
import db from '../../firebase/firebase';
import { memberStatus } from '../..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface Props {
    setInformation: (value: boolean) => void;
    setChooseInformationIndex: (value: number) => void;
    setInformationList: (value: { [key: number]: number | string }[]) => void;
    informationList: { [key: number]: number | string }[];
}

const MenuMessage = (props: Props) => {
    const [check, setCheck] = useState(false);
    const { memberInformation } = useContext(memberStatus);

    useEffect(() => {
        if (memberInformation) {
            const result = db.getMessageData(memberInformation);

            result.then((msg) => {
                let msgArray: { [key: number]: number | string }[] = [];
                const keyArray = Object.keys(msg);
                const cleanMsg = keyArray.map((element: string) => {
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

    let itemArray: JSX.Element[] = [];
    const messageData = Object.keys(props.informationList);
    let prevTimeIndex = '';
    messageData.map((element: string | number) => {
        if (prevTimeIndex !== Object(props.informationList)[element].index) {
            prevTimeIndex = Object(props.informationList)[element].index;
            let item = (
                <li
                    className={styles.item_container}
                    id={element as string}
                    key={`message-${element}`}
                    onClick={(e) => {
                        props.setInformation(true);
                        props.setChooseInformationIndex(element as number);
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

export default MenuMessage;
