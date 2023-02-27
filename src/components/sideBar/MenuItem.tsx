import React, { useState } from 'react';
import styled from 'styled-components';
import styles from "../../../public/css/sideBar.module.css"



//<InviteCard/>
const MenuItem= (props:any)=>{
    const [check,setCheck] = useState(false)
    return(
        <>
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
                        onChange={()=>{}}
                    />
                    <ul className={styles.menu_item}>
                        <li>買東西</li>
                        <li>買東西</li>
                        <li>買東西</li>
                        <li>買東西</li>
                        <li>買東西</li>
                        <li>買東西</li>
                    </ul>
                </li>
            </ul>
            
        </>
    )
}

export default MenuItem
