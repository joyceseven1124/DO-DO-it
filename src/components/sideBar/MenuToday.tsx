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
    let todayMonth = new Date().getMonth();
    let todayYear = new Date().getFullYear();
    const thisMonthStartWeek :number = new Date(todayYear, 
                                        todayMonth ,
                                        1).getDay();

    const thisDateId = thisMonthStartWeek + todayDay -1
    const rowStartId = [1,8,15,22,29,36]
    let dataArray:any = []
    todayData.forEach((element,index)=>{
        //知道目前的星期，並把id算出來
        //thisDateId && < element.id
        //rowStartId[Math.ceil(element.id/7)-1] <= thisDateId
        const thisWeekStartId = rowStartId[Math.ceil(element.id/7)-1]
        const thisWeekEndId = thisWeekStartId +6
        if(element.dayStart <= todayDay  && todayDay <= element.dayEnd && 
            thisWeekStartId <= thisDateId && thisDateId <= thisWeekEndId){
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
                        {dataArray.length === 0 ? (
                            <li>
                                <div className={styles.no_item}>目前沒有任務</div>
                            </li>
                        ):null}
                        {dataArray}
                    </ul>
                </li>
            </ul>
            
        </>
    )
}

export default MenuToday