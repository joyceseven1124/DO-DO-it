import React, { useState} from 'react';
import styles from '/public/css/toDoListDialogBox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserGroup} from '@fortawesome/free-solid-svg-icons'
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons'


interface TagData{
    id: number;
    width: number;
    title: string;
    description: string;
    connectWidth: number;
    color: string;
    index: string;
    status: string;
    yearStart: number;
    yearEnd: number;
    monthStart: number;
    monthEnd: number;
    dayStart: number;
    dayEnd: number;
    receiveEmail: string[];
    sendEmail: string;
    sendEmailName: string;
}
interface Props{
    friendData:string[]
    data:TagData
}

function AddGuest(props:Props) {
  const [rotate,setRotate] = useState("0")
  const [guestButtonWord,setGuestButtonWord] = useState("+")
  const [openFriendList,setOpenFriendList] = useState(false)
  const [friendChoose,setFriendChoose]=useState([])
  let friendListArray =props.friendData.map((element:string,index:number)=>{
    return <div className={styles.friend_list_item_wrapper}
                key={`friend-list-${element}`}
                id={`friend-list-${index}`}
                onClick={()=>{
                    let chooseArray = [...friendChoose]
                    if(chooseArray.includes(element)){
                        const newChooseArray = chooseArray.filter((email,index)=>{
                            if(email !== element){
                                return email
                            }
                        })
                        setFriendChoose(newChooseArray)
                    }else{
                        chooseArray.push(element)
                        setFriendChoose(chooseArray)
                    }
                    props.data.receiveEmail = chooseArray
                }}
                >
                <div className={styles.friend_list_item_email} key={`friend-item-${element}`}>
                    <FontAwesomeIcon icon={faCircleUser} className={styles.people_icon}/>
                    <div>{element}</div>
                </div>
                <div className={styles.friend_list_item_check} key={`friend-status-item-${element}`}>
                    {!friendChoose.includes(element) ?(
                        <div className={styles.friend_list_check}
                        id = {`list_unCheck_${index}`}
                        >◯</div>
                    ):null}

                    {friendChoose.includes(element) ?(
                        <FontAwesomeIcon  icon={faCircleCheck} className={styles.friend_list_check}
                                            id = {`list_check_${index}`}
                                        style={{color:"var(--brightMainDecorateColor)"}}/>
                    ):null}
                </div>
            </div>
        
  })

  return <>
            <div className={styles.add_guest_container}>
                <div className={styles.add_guest_wrapper}>
                    <FontAwesomeIcon icon={faUserGroup} className={styles.add_guest_icon}/>
                    <button className={styles.add_guest_button}
                        onClick = {(e)=>{
                            if(openFriendList){
                                setOpenFriendList(false)
                                setGuestButtonWord("+")
                            }else{
                                setOpenFriendList(true)
                                setGuestButtonWord("-")
                            }
                            let rotateDeg = "0"
                            if(rotate === "0"){
                                rotateDeg = "-180"
                            }
                            setRotate(rotateDeg)
                        }}
                    >
                        <div className={styles.choose_email_item_container}>{friendChoose.length>0? (
                                friendChoose.map((element,index)=>{
                                return <div key={`friend-email-${element}`} className={styles.choose_email_item}>{element}</div>
                            }))
                        :"Add guest"}</div>
                        <div 
                            style={{transform: `rotate(${rotate}deg)`,
                                    transition: "transform 0.6s",
                                }}
                            className={styles.arrow}>{guestButtonWord}</div>
                    </button>
                </div>
            </div>
            {openFriendList ?(
                <>
                    <div className={styles.friend_list_bg}
                        onClick={(e)=>{
                        setOpenFriendList(false)
                        setGuestButtonWord("+")
                        let rotateDeg = "0"
                        if(rotate === "0"){
                            rotateDeg = "-180"
                        }
                        setRotate(rotateDeg)
                    }}
                    ></div>

                    <div style={{display:`${openFriendList}`}} className={styles.friends_list_wrapper}>
                        <div className={styles.friends_list}>{
                            !(props.friendData.length === 0) ? friendListArray:(
                                <div className={styles.empty_email}>
                                    You can add friends in the FRIEND LIST menu
                                </div>
                        )}</div>
                    </div>
                </>
            ):null}
        </>
}



export default AddGuest;