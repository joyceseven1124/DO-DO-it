import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../public/css/sideBar.module.css';
import { memberStatus } from '../..';
import db from '../../firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface Props {
    setFriend: (value: boolean) => void;
    setFriendInformationCard: (value: boolean) => void;
    friendList: string[];
    setFriendList: (value: string[]) => void;
    setChooseEmail: (value: string) => void;
    friendListIndex: { [key: string]: string };
    setFriendListIndex: (friendListIndex: { [key: string]: string }) => void;
}

const MenuFriend = (props: Props) => {
    const [check, setCheck] = useState(false);
    const { memberInformation } = useContext(memberStatus);

    useEffect(() => {
        if (memberInformation) {
            const result = db.getFriendData(memberInformation);
            result.then((msg) => {
                if (msg.result !== null || !msg.result) {
                    props.setFriendListIndex(msg);
                    let friendEmail: string[] = [];
                    Object.keys(msg).map((element) => {
                        friendEmail.push(msg[element]);
                    });
                    props.setFriendList(friendEmail);
                }
            });
        }
    }, [memberInformation]);

    let itemArray: JSX.Element[] = [];
    const friendData = Object.keys(props.friendListIndex);
    friendData.map((element: number | string) => {
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
                    <FontAwesomeIcon
                        className={styles.menu_friend_delete_button}
                        icon={faTrashCan}
                        onClick={(e) => {
                            const result = db.deleteFriend(
                                element as string,
                                memberInformation
                            );
                            result.then((msg) => {
                                if (msg === 'success') {
                                    delete props.friendListIndex[element];
                                    let oldFriendEmail = [...props.friendList];
                                    let newFriendEmailList =
                                        oldFriendEmail.filter(
                                            (noDeleteElement: string) => {
                                                if (
                                                    noDeleteElement !==
                                                    friendEmail
                                                ) {
                                                    return noDeleteElement;
                                                }
                                            }
                                        );
                                    props.setFriendList(newFriendEmailList);
                                }
                            });
                            e.stopPropagation();
                        }}
                    />
                </div>
            </li>
        );
        itemArray.push(item);
    });
    return (
        <>
            <ul>
                <li className={styles.sidebar_menu_content}>
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

                    <label
                        htmlFor="friend"
                        className={styles.check_box_label}
                        id="Friend_label"
                    >
                        Friend list
                    </label>

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
                                <div className={styles.no_item}>Friendless</div>
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
