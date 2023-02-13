import React, { useState } from 'react';
import styled from 'styled-components';
import styles from "../../../public/css/sideBar.module.css"



//<InviteCard/>
const MenuItem= (props:any)=>{
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
            </div>
        </div>
    )
}

export default MenuItem
