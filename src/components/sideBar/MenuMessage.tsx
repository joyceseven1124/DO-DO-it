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
                    <input type="radio" className={styles.check_box} id="Message"
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
                        <li className={styles.item_container}
                            onClick={
                            (e)=>{props.setInformation(true)}
                        }>
                            <div>title名稱</div>
                            <div className={styles.person_icon}>1</div>
                        </li>
                    </ul>
                </li>
            </ul>
            
        </>
    )
}

export default MenuItem