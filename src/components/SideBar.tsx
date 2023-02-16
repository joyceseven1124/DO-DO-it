import React, { useState } from 'react';
import styled from 'styled-components';
import styles from "../../public/css/sideBar.module.css"
import InviteCard from './sideBar/InviteCard';
import MenuItem from './sideBar/MenuItem';
import MenuFriend from './sideBar/MenuFriend';
import MenuMessage from "./sideBar/MenuMessage"
import MenuToday from './sideBar/MenuToday';
import MenuTomorrow from './sideBar/MenuTomorrow';

const SideBar= (props:any)=>{
    return(
    <div className={styles.menu_container}>
        <div className={styles.menu_wrapper}>
            <MenuToday />
            <MenuTomorrow/>
            <MenuFriend setFriend={props.setFriend}
            setEditInvite={props.setEditInvite}
            friendList={props.friendList}
            setFriendList = {props.setFriendList}
            setChooseEmail = {props.setChooseEmail}
            />
            <MenuMessage setInformation={props.setInformation}/>
        </div>
    </div>
    )
}
export default SideBar