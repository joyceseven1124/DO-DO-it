import React, { useState,useContext } from 'react';
import styled from 'styled-components';
import styles from "../../../public/css/sideBar.module.css"
import { commonData } from '../../page/MonthPage';



//<InviteCard/>
const MenuTomorrow= (props:any)=>{
    const [check,setCheck] = useState(false)
    const {isTagsArray} = useContext(commonData)
    const {setShowTagIndex} = useContext(commonData)

    const tomorrowData = [...isTagsArray]
    let tomorrowDay = new Date().getDate()+1;
    tomorrowData.forEach((element)=>{
        if(element.dayStart <= tomorrowDay <= element.dayEnd){
            let item = (<li id={element.index}
                            className={styles.item_container}
                            onClick={
                            (e)=>{
                                console.log(e.target)
                                //setShowTagIndex(e.target.id)
                            }
                        }>
                            <div>element.title</div>
                            <div className={styles.today_icon}>1</div>
                        </li>)
        }
    })
    return(
        <>
            <ul>
                <li className={styles.today_content}>
                    <input type="radio" className={styles.check_box} id="tomorrow"
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
                        
                    </ul>
                </li>
            </ul>
            
        </>
    )
}

export default MenuTomorrow


/* <li className={styles.item_container}
                            onClick={
                            (e)=>{}
}>
    <div>title名稱</div>
    <div className={styles.today_icon}>1</div>
</li> */