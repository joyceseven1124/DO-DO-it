import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from '/public/css/InviteCard.module.css';
import { memberStatus } from '../..';
import { commonData } from '../../page/MonthPage';
import db from "../../firebase/firebase"


const InviteCard = (props:any) =>{
    const {memberName} = useContext(memberStatus)
    const {memberInformation} = useContext(memberStatus)
    const {setTagsArray} = useContext(commonData)
    const {isTagsArray} = useContext(commonData)

    const messageData = props.informationList[props.chooseInformationIndex]
    let messageConnectData = []
    const messageDataIndexArray =  Object.keys(props.informationList)

    const month = ["January" ,"February", "March","April", "May", "June", "July"
                    ," August", "September" ,"October", "November", "December"]
    const monthWord = month[messageData.monthStart-1].toUpperCase()
    const week = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    

    const thisDateWeek:number = new Date(messageData.yearStart, 
                                        messageData.monthStart,
                                        messageData.dayStart).getDay();
    
    const thisDateWeekWord =  week[thisDateWeek].toUpperCase()

    const time = `${messageData.yearStart}/${messageData.monthStart}/${messageData.dayStart}-
                  ${messageData.yearEnd}/${messageData.monthEnd}/${messageData.dayEnd}
                `

    return(
        <>
        <div className={styles.invite_wrapper}>
            <div className={styles.invite_content}>
                <div className={styles.close_container}
                     onClick={(e)=>{
                        props.setInformation(false)
                     }}>
                    <div className={styles.close_button}>關</div>
                </div>
                <h2>Invitation Card</h2>
                
                <div className={styles.invite_pic}>p</div>
                <div className={styles.invite_information}>
                    <div className={styles.title_and_name_container}>
                        <div className={styles.invite_receiver}>Dear {memberName}</div>
                        <div>
                            <div className={styles.item_title_word}>Invite you to</div>
                            <div>{messageData.title}</div>
                        </div>
                    </div>
                    <div className={styles.time_and_description_container}>
                        <div className={styles.time_container}>
                            <div className={styles.date_weekday}>{thisDateWeekWord}</div>
                            <div>{monthWord}</div>
                            <div className={styles.date_number}>{messageData.dayStart}</div>
                            <div>{messageData.yearStart}</div>
                        </div>
                        <div className={styles.schedule_content}>
                            <div>SCHEDULE</div>
                            {messageData.dayStart !== messageData.dayEnd ?
                                <div className={styles.schedule_content_word}>{time}</div>
                                :null
                            }
                            
                            <div className={styles.schedule_content_word}>{messageData.description}</div>
                        </div>
                    </div>
                    <div className={styles.send_name_container}>
                        <div className={styles.send_name}>BY:{messageData.sendEmailName} </div>
                        <div>Email: {messageData.sendEmail}</div>
                    </div>
                </div>
                <div className={styles.buttons_container}>
                    <button id='reject'  className={styles.invite_button}
                            onClick = {(e)=>{
                                const deleteResult = db.deleteMessage(memberInformation,messageData.index)
                                deleteResult.then((msg)=>{
                                    if(msg === "success"){
                                        const data = props.informationList
                                        const newMessageArray :{[key:number]:number | string}[]= []
                                        const newInformationList = messageDataIndexArray.filter((element:any)=>{
                                                if(data[props.chooseInformationIndex].index !== data[element].index){
                                                    newMessageArray.push(data[element])
                                                }
                                        })
                                        props.setInformationList(newMessageArray)
                                        props.setInformation(false)
                                    }
                                })
                            }}
                    >NO</button>
                    <button id="agree" className={styles.invite_button}
                        onClick={(e)=>{
                            const newTagArray = [...isTagsArray]
                            const data = props.informationList
                            const saveData :{[key:number]:number | string}[]= []
                            const newMessageArray :{[key:number]:number | string}[]= []
                            const newInformationList = messageDataIndexArray.map((element:any)=>{
                                    if(data[props.chooseInformationIndex].index !== data[element].index){
                                        newMessageArray.push(data[element])
                                    }else{
                                        newTagArray.push(data[element])
                                        saveData.push(data[element])
                                    }
                            })
                            const result = db.saveToDoList(`${messageData.yearStart}Y${messageData.monthStart}M`,
                                            saveData,messageData.index)
                            result.then((msg)=>{
                                if(msg === "success"){
                                    const deleteResult = db.deleteMessage(memberInformation,messageData.index)
                                    deleteResult.then((msg)=>{
                                        if(msg === "success"){
                                            setTagsArray(newTagArray)
                                            props.setInformationList(newMessageArray)
                                            props.setInformation(false)
                                        }
                                    })
                                }
                            })

                        }}
                    >OK!</button>
                </div>
               
            </div>
        </div>
        </>
    )
}

export default InviteCard