import React, { useState, useContext,useEffect} from 'react';
import styled from 'styled-components';
import styles from "../../../public/css/sideBar.module.css"
import db from "../../firebase/firebase"
import { memberStatus } from '../..';



//<InviteCard/>
const MenuItem= (props:any)=>{
    const [check,setCheck] = useState(false)
    const [message,setMessage] = useState({})
    const {memberInformation} = useContext(memberStatus)

    useEffect(()=>{
        if(memberInformation){
            const result = db.getMessageData(memberInformation)
            result.then((msg)=>{
                //msg[1677052893310][0]["width"]
                let msgArray:{[key:number]:number | string}[]= [];
                const keyArray = Object.keys(msg)
                const cleanMsg = keyArray.map((element:any)=>{
                    if(msg[element].length > 1){
                        msgArray.push(msg[element][0])
                        msgArray.push(msg[element][1])
                    }else{
                        msgArray.push(msg[element])
                    }
                })
                //setMessage(cleanMsg)
                props.setInformationList(msgArray)
            })
        }
    },[memberInformation])

    let itemArray:any = []
    const messageData = Object.keys(props.informationList)
    //比對前後是否有重複的部分
    let prevTimeIndex = ""
    messageData.map((element:string)=>{
        console.log("map")
        console.log(element)
        //console.log(Object(message)[element])
        if(prevTimeIndex !== Object(props.informationList)[element].index){
            prevTimeIndex = Object(props.informationList)[element].index
            let item = ( <li className={styles.item_container}
                            id = {element}
                            key = {`message-${element}`}
                            onClick={
                            (e)=>{props.setInformation(true)
                                props.setChooseInformationIndex(element)}
                            }>
                            <div>{Object(props.informationList)[element].title}</div>
                            <div className={styles.person_icon}>1</div>
                        </li>)
            itemArray.push(item)
        }
        
        //message[1676948693058]
        //console.log(message)
    })
    
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
                        {itemArray.length === 0 ? (
                            <li>
                                <div className={styles.no_item}>目前沒有任何邀請</div>
                            </li>
                        ):null}
                       {itemArray}
                    </ul>
                </li>
            </ul>
            
        </>
    )
}

export default MenuItem