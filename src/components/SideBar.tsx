import React, { useState } from 'react';
import styled from 'styled-components';
import styles from "../../public/css/sideBar.module.css"
import InviteCard from './sideBar/InviteCard';
import MenuItem from './sideBar/MenuItem';
import MenuFriend from './sideBar/MenuFriend';


//<InviteCard/>
/*const SideBar= (props:any)=>{
    const [check,setCheck] = useState(false)
    return(
        <div>
            
            <div className={styles.wrapper}>
                <div>使用者名稱</div>
                <ul>
                    <li className={styles.today_content}>
                        <input type="radio" className={styles.check_box} id="today"
                            checked={check} onClick={(e)=>{
                                if(!check){
                                    setCheck(true)
                                }else{
                                    setCheck(false)
                                }
                            }}
                        />
                        <ul className={styles.today_menu}>
                            <li>買東西</li>
                            <li>買東西</li>
                            <li>買東西</li>
                            <li>買東西</li>
                            <li>買東西</li>
                            <li>買東西</li>
                        </ul>
                    </li>
                </ul>
                <div>明日代辦事項</div>

                
                <div>好友名單


                </div>
            </div>
        </div>
    )
}*/
const SideBar= (props:any)=>{
    return(
    <div className={styles.sideBar_wrapper}>
        <input type="radio" name="" id="sideMenu-active"></input>
        <div className={styles.menu_wrapper}>
            <MenuItem today={"hello"}/>
            <MenuFriend friend={"111@gmail.com"}/>
            <MenuFriend friend={"111@gmail.com"}/>
        </div>
        <label htmlFor="sideMenu-active">
   		    <div className="fa-angle-right">888</div>
   	    </label>
    </div>
    )
}
export default SideBar