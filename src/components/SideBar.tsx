import React, { useState } from 'react';
import styled from 'styled-components';
import styles from "../../public/css/sideBar.module.css"
import InviteCard from './sideBar/InviteCard';
import MenuItem from './sideBar/MenuItem';
import MenuFriend from './sideBar/MenuFriend';
import MenuMessage from "./sideBar/MenuMessage"
import MenuToday from './sideBar/MenuToday';
import MenuTomorrow from './sideBar/MenuTomorrow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered} from '@fortawesome/free-solid-svg-icons'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'

const SideBar= (props:any)=>{
    return(
    <div className={styles.menu_container}>
        <div className={styles.menu_wrapper}>
            <div className={styles.menu_close_button}
                    onClick={(e)=>{
                        props.setSideBarStatus(false)
                        props.setGridRow("99% 1%")
                    }}>
                    <FontAwesomeIcon  icon={faBarsStaggered} />
                    <FontAwesomeIcon icon={faChevronRight} />
            </div>


            <div>
                <MenuToday />
                <MenuTomorrow/>
                <MenuFriend setFriend={props.setFriend}
                setFriendInformationCard={props.setFriendInformationCard}
                friendList={props.friendList}
                setFriendList = {props.setFriendList}
                setChooseEmail = {props.setChooseEmail}
                friendListIndex = {props.friendListIndex}
                setFriendListIndex = {props.setFriendListIndex}
                />
                <MenuMessage setInformation={props.setInformation}
                            setChooseInformationIndex = {props.setChooseInformationIndex}
                            setInformationList = {props.setInformationList}
                            informationList = {props.informationList}/>
            </div>
        </div>
    </div>
    )
}
export default SideBar