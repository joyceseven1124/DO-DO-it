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
                    props.setFriendListIndex(msg)
                    let friendEmail:string[] = []
                    Object.keys(msg).map((element)=>{
                        friendEmail.push(msg[element])
                    })
                    props.setFriendList(friendEmail);
                }
            });
        }
    }, [memberInformation]);


    let itemArray: any = [];
    const friendData = Object.keys(props.friendListIndex);
    friendData.map((element:any) => {
        if (element === 'result') {
            return;
        }
        let friendEmail = props.friendListIndex[element];
        let item = (
            <li
                className={styles.item_container_friend}
                key={`menuFriend-${element}`}
                id={friendEmail}
                onClick={(e) => {
                    props.setFriendInformationCard(true);
                    props.setChooseEmail(props.friendListIndex[element]);
                }}
            >
                <div className={styles.friend_email_word}>{friendEmail}</div>
                <div className={styles.menu_friend_button_wrapper}>
                    <FontAwesomeIcon icon={faUser} />
                    <FontAwesomeIcon className={styles.menu_friend_delete_button} 
                        icon={faTrashCan}
                        onClick={(e)=>{
                            const result =db.deleteFriend( element,memberInformation )
                            result.then((msg)=>{
                                let newFriendList:any =[]
                                if(msg === "success"){
                                    delete props.friendListIndex[element];
                                    let newFriendEmail = [...props.friendList]
                                    newFriendEmail.push(friendEmail)
                                    props.setFriendList(newFriendEmail)
                                }
                                props.setFriendList(newFriendList)
                            })
                            e.stopPropagation()
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
                            <div>Add a friend</div>
                            <div>+</div>
                        </div>
                        {itemArray.length === 0 ? (
                            <li>
                                <div className={styles.no_item}>
                                    Friendless
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
