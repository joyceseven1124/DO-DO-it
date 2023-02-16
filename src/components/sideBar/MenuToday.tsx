import React, { useState,useContext } from 'react';
import styled from 'styled-components';
import styles from "../../../public/css/sideBar.module.css"
import { commonData } from '../../page/MonthPage';


//<InviteCard/>
const MenuToday= (props:any)=>{
    const [check,setCheck] = useState(false)
    const {isTagsArray} = useContext(commonData)
    const {setShowTagIndex} = useContext(commonData)
    const {setShowListDialog} = useContext(commonData)
    const todayData = [...isTagsArray]
    let todayDay = new Date().getDate();
    let dataArray:any = []

    todayData.forEach((element,index)=>{
        if(element.dayStart <= todayDay  && todayDay <= element.dayEnd){
            let item = (<li id={element.index}
                            className={styles.item_container}
                            key={`menu-today-${index}`}
                            onClick={
                            (e)=>{
                                setShowTagIndex(element.index)
                                setShowListDialog(true)
                            }
                        }>
                            <div>{element.title}</div>
                            <div className={styles.today_icon}>1</div>
                        </li>)
            dataArray.push(item)
            
        }
    })



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
                        {dataArray}
                    </ul>
                </li>
            </ul>
            
        </>
    )
}

export default MenuToday