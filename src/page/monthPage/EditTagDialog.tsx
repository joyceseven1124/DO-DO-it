import React, { useEffect, useState, useRef,useContext } from 'react';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/editTagDialog.module.css';
import { tagData } from './MonthCell';
import {memberStatus} from "../../"
import db from "../../firebase/firebase"

export default function EditTagDialog(props:any){
    const {memberInformation} = useContext(memberStatus)
    const { setShowListDialog } = useContext(tagData)
    const {isTagsArray} = useContext(tagData)
    const {setTagsArray} = useContext(tagData)
    const {showTagIndex} = useContext(tagData)
    const [editDescription,setEditDescription] = useState(true)
    const [editTitle,setEditTitle] = useState(true)
    const [editColor,setEditColor] = useState(true)
    const [title,setTitle] = useState(" ")
    const [date,setDate] = useState(" ")
    const [description,setDescription] = useState("")
    const [titleRow,setTitleRow] = useState(1)
    const [color,setColor] = useState("")
    const [status,setStatus] = useState("未完成")
    const [statusSentence,setStatusSentence] = useState("任務進行中...")
    const [buttonWord,setButtonWord] = useState("達成任務")
    let titleWord:string
    let dateWord:string
    let descriptionWord:string
    let colorWord:string
    let statusWord:string
    const closeDialog = (e:any) =>{
        setShowListDialog(false)
    }
   
    const dialogData = isTagsArray.filter((element:any)=>{
        let count = 0
        if(element.index === showTagIndex){
            // count++
            // if(count>1){
            //     return
            // }
            const startDate = `${element.yearStart}/${element.monthStart}/${element.dayStart}`
            const endDate = `${element.yearEnd}/${element.monthEnd}/${element.dayEnd}`
            dateWord = `${startDate}-${endDate}`
            titleWord = element.title
            descriptionWord = element.description
            colorWord = element.color
            if(element.status === "未完成"){
                statusWord = "任務進行中"
            }else{
                statusWord = "任務完成囉"
            }
            //setDate(`${startDate}-${endDate}`)
            //setTitle(element.title)
            //setDescription(element.description)
            return element
        }
    })



    useEffect(()=>{
        setDate(dateWord)
        setTitle(titleWord)
        setDescription(descriptionWord)
        setColor(colorWord)
        setStatusSentence(statusWord)
        if(statusWord !== "任務進行中"){
            setButtonWord("任務未達")
            setStatus("完成")
        }
    },[])

    const updateData = ()=>{
        const dataArray = [...isTagsArray]
        let newDataArray = dataArray.filter((element)=>{
            if(element.index !== showTagIndex){
                return element
            }
        })
        let time
        let index


        dialogData.map((element:any)=>{
            element.title = title
            element.description = description
            element.color = color
            element.status = status
            //element.startYear
            time = `${element.yearStart}Y${element.monthStart}M`
            index = element.index
            newDataArray.push(element)
            if(dialogData.length === 1){
                db.updateData(memberInformation,time,index,element)
            }
        })
        if(dialogData.length >1){
            db.updateData(memberInformation,time,index,dialogData)
        }
        
        console.log(dialogData)
        
        console.log(newDataArray)
        setTagsArray(newDataArray)
    }
    
    return(
        <div className={styles.edit_card_wrapper}>
            <div className={styles.edit_card_content}>
                <div className={styles.edit_card_decorate}>
                    <h2 className={styles.task_word}>TASK STATUS</h2>
                    <div className={styles.edit_card_pic}>1</div>
                    <h3>{statusSentence}</h3>
                </div>
                
                <div className={styles.list_information}>
                    <div className={styles.close_container}>
                        <div className={styles.close_button} onClick={closeDialog}>關</div>
                    </div>
                    <div className={styles.list_title_content}>
                        
                        <input type="color" 
                               style={{backgroundColor:`${color}`}}
                               className={styles.list_color}
                               disabled = {editColor}
                               onChange={(e)=>{
                                e.target.click()
                                setColor(e.target.value)
                               }}/>
                        <textarea   className={styles.list_title}
                                    cols={10} 
                                    rows={titleRow} 
                                    value={`${title}`} 
                                    readOnly={editTitle}
                                    onChange={(e)=>{
                                        setTitle(e.target.value)
                                        if(e.target.value.length<10){
                                            setTitleRow(1)
                                        }else if(e.target.value.length>10){
                                            setTitleRow(2)
                                        }
                                    }}/>
                        {editTitle ? (
                            <div className={styles.description_mark_tool}
                             onClick={(e)=>{setEditTitle(false)
                                            setEditColor(false)
                            }}
                        >筆</div>
                        ):(
                            <div className={styles.save_word}
                                onClick={(e)=>{
                                    setEditTitle(true)
                                    setEditColor(true)
                                    updateData()
                                }}
                            >儲存</div>
                        )}
                        
                    </div>
                    <div className={styles.list_date}>{date}</div>
                    <div  className={styles.description_content}>
                        <textarea id="content" 
                                  value={description}
                                  cols={25} 
                                  rows={8}
                                  readOnly={editDescription}
                                  onChange={(e)=>{
                                    setDescription(e.target.value)
                                  }}
                        />
                        {editDescription?(
                             <div className={styles.description_mark_tool}
                             onClick={(e)=>{
                                setEditDescription(false)
                             }}>筆</div>
                        ):(
                            <div className={styles.save_word}
                                id="description_save_word"
                                onClick={(e)=>{
                                    setEditDescription(true)
                                    updateData()
                                }}
                            >儲存</div>
                        )}
                       
                    </div>
                    <div className={styles.button_wrapper}>
                        <div className={styles.delete_button}>刪除任務</div>
                        <div className={styles.finish_button}
                             onClick={(e)=>{
                                if(status === "未完成"){
                                    setStatus("完成")
                                    setStatusSentence("任務完成囉")
                                    setButtonWord("任務未達")
                                }else{
                                    setStatus("未完成")
                                    setStatusSentence("任務進行中")
                                    setButtonWord("達成任務")
                                }
                                updateData()
                             }}
                        >{buttonWord}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}