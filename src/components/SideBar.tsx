import React from 'react';
import styles from "../../public/css/sideBar.module.css"
import MenuFriend from './sideBar/MenuFriend';
import MenuMessage from "./sideBar/MenuMessage"
import MenuToday from './sideBar/MenuToday';
import MenuTomorrow from './sideBar/MenuTomorrow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered} from '@fortawesome/free-solid-svg-icons'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'

interface Props {
  setFriend: (value: boolean) => void
  setSideBarStatus: (value: boolean) => void
  setGridRow: (value: string) => void
  setInformation: (value: boolean) => void
  setFriendInformationCard: (value: boolean) => void
  friendList: string[]
  setFriendList: (value: string[]) => void
  setChooseEmail: (value: string) => void
  setChooseInformationIndex: (value: number) => void
  setInformationList : (value: { [key: number]: number | string }[]) => void
  informationList : { [key: number]: number | string }[]
  friendListIndex : {[key:string]:string}
  setFriendListIndex : (friendListIndex : {[key:string]:string}
) => void
}

const SideBar= (props:Props)=>{
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


            <div className={styles.menu_title_wrapper}>
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