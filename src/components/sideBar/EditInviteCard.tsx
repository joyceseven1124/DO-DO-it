import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from '/public/css/editInviteCard.module.css';
import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import weekday from 'dayjs/plugin/weekday';
import { memberStatus } from '../..';
import { commonData } from '../../page/MonthPage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import db from "../../firebase/firebase"
dayjs.extend(toObject);
dayjs.extend(weekday);

const EditInviteCard = (props:any) =>{
    const [color,setColor] = useState("#f0900a")
    const [startBorderColor,setStartBorderColor] = useState(null)
    const [startShadow,setStartShadow] = useState(null)
    const [daysNumber,setDaysNumber] = useState(1)
    const [remindTimeWord,setRemindTimeWord] = useState("")
    const [remindTitleWord,setRemindTitleWord] = useState("")
    const {memberInformation} = useContext(memberStatus)
    const {memberName} = useContext(memberStatus)
    const {isTagsArray} = useContext(commonData)
    const {setTagsArray} = useContext(commonData)
    const monthNumber = useSelector(
        (state: RootState) => state.timeControlReducer.monthNumber
    );
    const year = useSelector(
        (state: RootState) => state.timeControlReducer.year
    );

    // 1px solid red

    // let description:string=""
    // let title:string
    // let startYear:string
    // let startMonth:string
    // let startDay:string
    
    let description = useRef("")
    let title = useRef("")
    let startYear = useRef(0)
    let startMonth = useRef(0)
    let startDay =useRef(0)



    const sendInvite = (e:any)=>{

        if(!title || !startYear || !startMonth || !startDay){
            if(!title){
                setRemindTitleWord("請填寫標題")
            }
            if(!startYear || !startMonth || !startDay){
                setRemindTimeWord("請填寫年月日")
            }
            return
        }

        //檢查時間串是否為三且正確是數字，用正規
        //props.chooseEmail

        const checkStartDate = new Date(`${startYear.current}/${startMonth.current}/${startDay.current}`).toLocaleString();

        if(checkStartDate === "Invalid Date"){
            setRemindTimeWord("請填寫正確日期")
            return
        }

        if(checkStartDate){
            const checkDateArray = checkStartDate.split("/")
            if(Number(checkDateArray[1]) !== startMonth.current){
                setRemindTimeWord("請填寫正確日期")
                return
            }
        }

        const maxDay = new Date(startYear.current,startMonth.current,0).getDate();
        let endYear:number = startYear.current
        let endMonth:number = startMonth.current
        let endDay = startDay.current+daysNumber-1
        let connectWidth = daysNumber * 100
        let width = daysNumber * 100
        let data = []
        let allData = [...isTagsArray]
        let uuidDate = new Date().getTime().toString();


        //获取当前星期X(0-6,0代表星期天)
        let myDateWeek = new Date(startYear.current, 
                                    startMonth.current-1, 
                                    startDay.current).getDay();

        let monthStartWeek: number = new Date(startYear.current, 
                                                startMonth.current-1, 
                                                1).getDay();

        let monthEndWeek : number = new Date(startYear.current, 
                                                startMonth.current-1, 
                                                maxDay).getDay();

        if(monthStartWeek === 0){
            monthStartWeek = 7
        }
        if(monthEndWeek === 0){
            monthEndWeek = 7
        }
        if(myDateWeek === 0){
            myDateWeek = 7
        }
        const thisTagId = monthStartWeek+startDay.current-1
        let  thisTagEndId = monthStartWeek + endDay -1
        const rowStartId = [1,8,15,22,29,36]
        //檢查是否換行
        const checkEndDayPlace = myDateWeek + daysNumber-1
       
        //第二行要插在哪個位置
        if(checkEndDayPlace > 7){
            const rowNumber = Math.ceil(thisTagEndId/7)
            const endRowNumber = Math.ceil((maxDay+monthStartWeek)/7)
            
            if(endDay>maxDay){
                endMonth = endMonth+1
                endDay = endDay - maxDay
                if(endMonth>12){
                    endMonth = 1
                    endYear = endYear + 1
                }
            }

            if(rowNumber > endRowNumber){
                //會也兩種width 兩種connectWidth，不用push先送出去給資料
                //知道下個月的起始時間
                //邀請函的部分不可以被拖動
                
                let changePageArray:{[key:number]:number | string}[] = []
                let nextMonthStartWeek: number = new Date(startYear.current,
                                            startMonth.current-1+1,
                                            1).getDay();
                
                console.log("下個月星期幾", nextMonthStartWeek)
                if(nextMonthStartWeek === 0){
                    nextMonthStartWeek = 7
                }
                //connectWidth = (7 - myDateWeek +1)*100
                //width = (7 - myDateWeek+1)*100

                connectWidth = (monthEndWeek - myDateWeek +1)*100
                width = (monthEndWeek - myDateWeek+1)*100
                const allDayWidth = daysNumber*100
                const secondConnectWidth = allDayWidth-connectWidth
                const uuidIndex = (new Date().getTime()+1).toString();
                //thisTagEndId = nextMonthStartWeek + (7-monthEndWeek)
                thisTagEndId = nextMonthStartWeek 
                
                //聯絡資料庫
                console.log("secondConnectWidth,",secondConnectWidth)
                console.log("thisTagEndId:",thisTagEndId)
                console.log("判斷是否多出來:",thisTagEndId+connectWidth/100-1)

                if((thisTagEndId+secondConnectWidth/100-1)>7){
                    console.log("123")
                    const secondWidth = secondConnectWidth - (7-thisTagEndId+1)*100
                    console.log(" secondWidth", secondWidth)
                    
                    let toDoListData = {title:title.current,
                                        color:color,
                                        yearStart:startYear.current,
                                        yearEnd:endYear,
                                        monthStart:startMonth.current,
                                        monthEnd:endMonth,
                                        dayStart:startDay.current,
                                        dayEnd:endDay,
                                        description:description.current,
                                        status:"未完成",
                                        index:uuidIndex,
                                        id:8,
                                        //connectWidth:allDayWidth-connectWidth,
                                        connectWidth: secondConnectWidth,
                                        //這裡width要更改
                                        width:secondWidth,
                                        receiveEmail:props.chooseEmail,
                                        sendEmail:memberInformation,
                                        sendEmailName:memberName
                    }
                    changePageArray.push(toDoListData)
                }

                let finalSendData
                
                console.log("標籤:",uuidDate,uuidIndex)
                let toDoListData = {title:title.current,
                                    color:color,
                                    yearStart:startYear.current,
                                    yearEnd:endYear,
                                    monthStart:startMonth.current,
                                    monthEnd:endMonth,
                                    dayStart:startDay.current,
                                    dayEnd:endDay,
                                    description:description.current,
                                    status:"未完成",
                                    index:uuidIndex,
                                    id:thisTagEndId,
                                    //connectWidth:allDayWidth-connectWidth,
                                    connectWidth: secondConnectWidth,
                                    //這裡width要更改
                                    width:(7-thisTagEndId)*100,
                                    receiveEmail:props.chooseEmail,
                                    sendEmail:memberInformation,
                                    sendEmailName:memberName
                }
                console.log("changePageArray.length:",changePageArray.length)
                if(changePageArray.length > 0){
                    console.log("跨頁多行")
                    toDoListData.width = (7-thisTagEndId+1)*100
                    changePageArray.push(toDoListData)
                    finalSendData = changePageArray
                    console.log("finalSendData:", finalSendData)
                    
                }else{
                    finalSendData = toDoListData
                }


                const result = db.sendMessage(memberInformation,
                               props.chooseEmail,
                               Number( uuidIndex),
                               finalSendData,
                               `${endYear}Y${endMonth}M`)

                result.then((msg)=>{
                    if(msg){
                        if(monthNumber ===  endMonth && year ===endYear){
                            //data.push(toDoListData)
                            allData.push(toDoListData)
                            setTagsArray(allData)
                        }
                        props.setEditInvite(false)
                    }

                })
                
            }else{
                console.log("換行")
                thisTagEndId = rowStartId[rowNumber-1]
                //會有兩種width 1個connect
                width = (7-myDateWeek+1)*100
                //第二條的資料
                let toDoListData = {title:title.current,
                                    color:color,
                                    yearStart:startYear.current,
                                    yearEnd:endYear,
                                    monthStart:startMonth.current,
                                    monthEnd:endMonth,
                                    dayStart:startDay.current,
                                    dayEnd:endDay,
                                    description:description.current,
                                    status:"未完成",
                                    index:uuidDate,
                                    id:thisTagEndId,
                                    connectWidth:connectWidth,
                                    width:connectWidth-width,
                                    receiveEmail:props.chooseEmail,
                                    sendEmail:memberInformation,
                                    sendEmailName:memberName
                                }
                //成功才能push 且要是當日
                if(monthNumber === startMonth.current && year === startYear.current){
                    data.push(toDoListData)
                    allData.push(toDoListData)
                }
                //set回Array
            }
        }

 
        //const thisTagEndId=thisTagId+daysNumber-1

        //得知道是否有換行
        //if(thisTagEndId)

        //第一條線的資料，檢查是否有第二條，沒有就送出
        let toDoListData = {title:title.current,
            color:color,
            yearStart:startYear.current,
            yearEnd:endYear,
            monthStart:startMonth.current,
            monthEnd:endMonth,
            dayStart:startDay.current,
            dayEnd:endDay,
            description:description.current,
            status:"未完成",
            index:uuidDate,
            id:thisTagId,
            connectWidth:connectWidth,
            width:width,
            receiveEmail:props.chooseEmail,
            sendEmail:memberInformation,
            sendEmailName:memberName
        }
        if(data.length > 0){
            data.push(toDoListData)
            const result = db.sendMessage(memberInformation,
                               props.chooseEmail,
                               Number(uuidDate),
                               data,
                               `${startYear.current}Y${startMonth.current}M`)
            //成功才能push 且要是當日
            result.then((msg)=>{
                if(msg){
                    if(monthNumber === startMonth.current && year === startYear.current){
                        allData.push(toDoListData)
                        setTagsArray(allData)
                    }
                    props.setEditInvite(false)
                    setTagsArray(allData)
                }
            })
        }else{
            //聯絡資料庫
            const result = db.sendMessage(memberInformation,
                               props.chooseEmail,
                               Number(uuidDate),
                               toDoListData,
                               `${startYear.current}Y${startMonth.current}M`)
            console.log("標籤:",uuidDate)
            //成功才能push 且要是當日
            result.then((msg)=>{
                if(msg){
                    if(monthNumber === startMonth.current && year === startYear.current){
                        allData.push(toDoListData)
                        setTagsArray(allData)
                    }
                    props.setEditInvite(false)
                }
            })

        }
    }

    return(
        <>
            <div className={styles.edit_invite_wrapper}>
                <div className={styles.edit_invite_container}>
                    <div className={styles.edit_invite_background}>
                        <div>
                            <h2>INVITATION CARD</h2>
                            <div className={styles.edit_invite_decorate}></div>
                            <div>TO:</div>
                            <div className={styles.friend_email}>{props.chooseEmail}</div>
                        </div>
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
                                    maxLength={10}
                                    onChange={(e)=>{
                                        title.current=e.target.value
                                    }}
                                    />

                            <div className={styles.under_line}></div>
                            <div className={styles.remind_word}>{remindTitleWord}</div>
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
                                                    startYear.current = Number(e.target.value)
                                                }}/>
                                        <div className={styles.time_bottom_word}>Year</div>
                                    </div>

                                    <div className={styles.time_item} id="edit_invite_time_center">
                                        <input  placeholder='02' 
                                                className={styles.time_input} 
                                                maxLength={2}
                                                style={{border:`${startBorderColor}`,
                                                        boxShadow:`${startShadow}`
                                                    }}
                                                onChange={(e)=>{
                                                    startMonth.current = Number(e.target.value)
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
                                                    startDay.current = Number(e.target.value)
                                                }}/>
                                        <div className={styles.time_bottom_word}>Day</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.remind_word}>{remindTimeWord}</div>


                        <div className={styles.edit_invite_days_wrapper}>
                            <button className={styles.edit_invite_days_border}>
                                <div className={styles.edit_invite_days_content}>
                                    <div className={styles.edit_invite_day_button}
                                        onClick={(e)=>{
                                            if(daysNumber === 1){
                                                setDaysNumber(1)
                                            }else{
                                                let number = daysNumber
                                                setDaysNumber(number-1)
                                            }
                                        }}
                                    >-</div>
                                    <div className={styles.edit_invite_day}>{daysNumber}天</div>
                                    <div className={styles.edit_invite_day_button}
                                        onClick={(e)=>{
                                            if(daysNumber === 7){
                                                setDaysNumber(7)
                                            }else{
                                                let number = daysNumber
                                                setDaysNumber(number+1)
                                            }
                                        }}
                                    >+</div>
                                </div>
                                <div className={styles.edit_invite_day_bottom_word}>Number of days</div>
                            </button>
                        </div>

                        <div className={styles.edit_invite_description_wrapper}>
                            <span className={styles.description_icon}>描</span>
                            <div>
                                <textarea
                                className={styles.edit_invite_description}
                                placeholder='Add description'
                                rows={10}
                                cols={25}
                                onChange={(e)=>{
                                    description.current = e.target.value
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