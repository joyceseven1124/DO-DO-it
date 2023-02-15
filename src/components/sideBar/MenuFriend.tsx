import React, { useState } from 'react';
import styled from 'styled-components';
import styles from "../../../public/css/sideBar.module.css"
import AddFriendCard from './AddFriendCard';



//<InviteCard/>
const MenuFriend= (props:any)=>{
    const [check,setCheck] = useState(false)

    return(
        <>
            <ul>
                <li className={styles.today_content}>
                    <input type="radio" className={styles.check_box} id="friend"
                        checked={check} onClick={(e)=>{
                            if(!check){
                                setCheck(true)
                            }else{
                                setCheck(false)
                            }
                        }}
                        onChange={()=>{}}
                    />
                    <ul className={styles.menu_item}>
                        <div className={styles.add_item} onClick={(e)=>{
                            props.setFriend(true)
                        }}>
                            <div>新增夥伴</div>
                            <div>+</div>
                        </div>
                        <li className={styles.item_container} onClick={(e)=>{
                            props.setEditInvite(true)
                        }}>
                            <div>111@gmail.com</div>
                            <div className={styles.email_icon}>1</div>
                        </li>
                    </ul>
                </li>
            </ul>
            
        </>
    )
}

export default MenuFriend