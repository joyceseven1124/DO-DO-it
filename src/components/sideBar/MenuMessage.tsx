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
                setMessage(msg)
                props.setInformationList(msg)
            })
        }
    },[memberInformation])

    let itemArray:any = []
    const messageData = Object.keys(message)
    messageData.map((element:string)=>{
        //console.log(Object(message)[element])
        let item = ( <li className={styles.item_container}
                        id = {element}
                        key = {`message-${element}`}
                        onClick={
                        (e)=>{props.setInformation(true)
                              props.setChooseInformationIndex(element)}
                        }>
                        <div>{Object(message)[element].title}</div>
                        <div className={styles.person_icon}>1</div>
                    </li>)
        itemArray.push(item)
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