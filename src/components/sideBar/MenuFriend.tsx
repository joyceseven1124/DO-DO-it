import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import styles from '../../../public/css/sideBar.module.css';
import AddFriendCard from './AddFriendCard';
import { memberStatus } from '../..';
import db from '../../firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

//<InviteCard/>
const MenuFriend = (props: any) => {
    const [check, setCheck] = useState(false);
    const { memberInformation } = useContext(memberStatus);

    useEffect(() => {
        if (memberInformation) {
            const result = db.getFriendData(memberInformation);
            result.then((msg) => {
                if (msg.result !== null || !msg.result) {
                    props.setFriendList(msg);
                }
            });
        }
    }, [memberInformation]);

    let itemArray: any = [];
    const friendData = Object.keys(props.friendList);
    friendData.map((element) => {
        if (element === 'result') {
            return;
        }
        let friendEmail = props.friendList[element];
        let item = (
            <li
                className={styles.item_container}
                key={`menuFriend-${element}`}
                id={friendEmail}
                onClick={(e) => {
                    props.setFriendInformationCard(true);
                    props.setChooseEmail(element);
                }}
            >
                <div>{friendEmail}</div>
                <div className={styles.menu_friend_button_wrapper}>
                    <FontAwesomeIcon icon={faUser} />
                    <FontAwesomeIcon className={styles.menu_friend_delete_button} 
                        icon={faTrashCan}
                        onClick={(e)=>{
                            console.log("hello")
                        }}/>
                </div>
            </li>
        );
        itemArray.push(item);
    });
    return (
        <>
            <ul>
                <li className={styles.today_content}>
                    <input
                        type="radio"
                        className={styles.check_box}
                        id="friend"
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
                    <ul className={styles.menu_item}>
                        <div
                            className={styles.add_item}
                            onClick={(e) => {
                                props.setFriend(true);
                            }}
                        >
                            <div>Add friend</div>
                            <div>+</div>
                        </div>
                        {itemArray.length === 0 ? (
                            <li>
                                <div className={styles.no_item}>
                                    目前沒有朋友
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

export default MenuFriend;
