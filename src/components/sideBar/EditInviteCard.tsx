import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from '/public/css/editInviteCard.module.css';
import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import weekday from 'dayjs/plugin/weekday';
import { Console } from 'console';
dayjs.extend(toObject);
dayjs.extend(weekday);

const EditInviteCard = (props:any) =>{
    const [color,setColor] = useState("#f0900a")
    const [startBorderColor,setStartBorderColor] = useState(null)
    const [startShadow,setStartShadow] = useState(null)
    const [endShadow,setEndShadow] = useState(null)
    const [endBorderColor,setEndBorderColor] = useState(null)
    const [remindWord,setRemindWord] = useState("#929191")
    // 1px solid red
    let description:string
    let title:string
    let startTime:string
    let endTime:string

    const sendInvite = (e:any)=>{
        
        //檢查時間串是否為三且正確是數字，用正規
        //props.chooseEmail

        // if(!description || !title || !startTime || !endTime){
        //     console.log("不可空白")
        //     return
        // }


        const checkStartDate = new Date(startTime).toLocaleString();
        const checkEndDate = new Date(endTime).toLocaleString();
        console.log(1)
        console.log(startTime)
        console.log(endTime)
        let startTimeArray = startTime.split("/")
        let endTimeArray = endTime.split("/")
        console.log(2)

        if(checkStartDate === "Invalid Date" || 
           checkEndDate === "Invalid Date" ||
           startTimeArray.length < 3 ||
           endTimeArray.length < 3){
            console.log("判斷式中")
            if(checkStartDate === "Invalid Date"){
                console.log("沒有此日期1")
                setStartBorderColor("2px solid red")
                setStartShadow("1px 1px 3px 2px rgba(20%,20%,40%,0.5) inset")
            }

            if(checkEndDate === "Invalid Date"){
                console.log("沒有此日期2")
                setEndBorderColor("2px solid red")
                setEndShadow("1px 1px 3px 2px rgba(20%,20%,40%,0.5) inset")
            }
    
            if(startTimeArray.length < 3){
                console.log("長度不一樣1")
                setStartBorderColor("2px solid red")
                setStartShadow("1px 1px 3px 2px rgba(20%,20%,40%,0.5) inset")
            }
            if(endTimeArray.length <3){
                console.log("長度不一樣2")
                setEndBorderColor("2px solid red")
                setEndShadow("1px 1px 3px 2px rgba(20%,20%,40%,0.5) inset")
            }
            return
        }

        
        
        const startYear = Number(startTimeArray[0])
        const startMonth = Number(startTimeArray[1])
        const startDay = Number(startTimeArray[2])

        const endYear = Number(endTimeArray[0])
        const endMonth = Number(endTimeArray[1])
        const endDay = Number(endTimeArray[2])

        if( startYear !== endYear){
            console.log("年分不一樣")
            setRemindWord("var(--deleteButtonColor)")
            
            return
        }

        if( startMonth !== endMonth){
            console.log("月份不一樣")
            setRemindWord("var(--deleteButtonColor)")
            return
        }




        //月份1月不知是0還是1
        let monthStart: number = dayjs()
            .add(startMonth-1, 'month')
            .date(1)
            .get('day');
        console.log(monthStart)
        const id = monthStart-1+startDay
        console.log(id)
    }

    return(
        <>
            <div className={styles.edit_invite_wrapper}>
                <div className={styles.edit_invite_container}>
                    <div>
                        <h2>INVITATION CARD</h2>
                        <div className={styles.edit_invite_decorate}></div>
                        <div>TO:</div>
                        <div className={styles.friend_email}>{props.chooseEmail}</div>
                        
                    </div>
                    <div className={styles.edit_invite_information}>

                        <div className={styles.close_container}
                             onClick={(e)=>{props.setEditInvite(false)}}>
                            <div className={styles.close_button}>關</div>
                        </div>

                        <div className={styles.edit_invite_title_wrapper}>
                            <input  className={styles.edit_invite_title} 
                                    placeholder='Add title'
                                    type="text"
                                    autoFocus={true}
                                    maxLength={10}/>

                            <div className={styles.under_line}></div>
                            <div>必填</div>
                        </div>


                        





                        <div className={styles.edit_invite_days_wrapper}>
                            <div className={styles.edit_invite_day_button}>-</div>
                            <div className={styles.edit_invite_day}>1天</div>
                            <div className={styles.edit_invite_day_button}>+</div>
                        </div>
                        
                        <div className={styles.time_container}>
                            <span className={styles.time_icon}>時</span>
                            <div>
                                <div className={styles.time_information}>
                                    <div className={styles.time_item}>
                                        <input  placeholder='2022' 
                                                className={styles.time_input} 
                                                maxLength={4}
                                                style={{border:`${startBorderColor}`,
                                                        boxShadow:`${startShadow}`
                                                    }}
                                                onChange={(e)=>{
                                                    console.log(startTime)
                                                    startTime = e.target.value
                                                }}/>
                                        <div className={styles.time_bottom_word}>Year</div>
                                    </div>

                                    <div className={styles.time_item}>
                                        <input  placeholder='02' 
                                                className={styles.time_input} 
                                                maxLength={2}
                                                style={{border:`${startBorderColor}`,
                                                        boxShadow:`${startShadow}`
                                                    }}
                                                onChange={(e)=>{
                                                    console.log(startTime)
                                                    startTime = e.target.value
                                                }}/>
                                        <div className={styles.time_bottom_word}>Month</div>
                                    </div>

                                    <div className={styles.time_item}>
                                        <input  placeholder='22' 
                                                className={styles.time_input} 
                                                maxLength={2}
                                                style={{border:`${startBorderColor}`,
                                                        boxShadow:`${startShadow}`
                                                    }}
                                                onChange={(e)=>{
                                                    console.log(startTime)
                                                    startTime = e.target.value
                                                }}/>
                                        <div className={styles.time_bottom_word}>Day</div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className={styles.edit_invite_description_wrapper}>
                            <span className={styles.description_icon}>描</span>
                            <div>
                                <textarea
                                className={styles.edit_invite_description}
                                placeholder='100字以內' 
                                rows={10}
                                cols={25}
                                onChange={(e)=>{
                                    description = e.target.value
                                }}/>
                                <div className={styles.description_under_line}></div>
                            </div>
                        </div>


                        
                        <div>為夥伴選個標籤顏色吧</div>
                        <div className={styles.color_selector_wrapper}>
                            <div>顏色:</div>
                            <input  className={styles.color_selector} 
                                    type="color"
                                    style={{backgroundColor:`${color}`}}
                                    onChange={(e)=>{
                                        e.target.click()
                                        setColor(e.target.value)
                                    }}/>
                        </div>



                        <div className={styles.send_invite_button_wrapper}>
                            <div className={styles.send_invite_button}
                                 onClick={sendInvite}>傳送</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditInviteCard