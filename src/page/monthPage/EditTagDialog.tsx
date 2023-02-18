import React, { useEffect, useState, useRef,useContext } from 'react';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/editTagDialog.module.css';
import { tagData } from './MonthCell';
import {memberStatus} from "../../"
import db from "../../firebase/firebase"
import { commonData } from '../MonthPage';
import { electron } from 'webpack';

export default function EditTagDialog(props:any){
    const {memberInformation} = useContext(memberStatus)
    const { setShowListDialog } = useContext(commonData)
    const {isTagsArray} = useContext(commonData)
    const {setTagsArray} = useContext(commonData)
    const {showTagIndex} = useContext(commonData)
    const {chooseCell} = useContext(commonData)
    const {setChooseCell} = useContext(commonData)
    const [editDescription,setEditDescription] = useState(true)
    const [editTitle,setEditTitle] = useState(true)
    const [cursorStatus,setCursorStatus] = useState(null)
    const [editColor,setEditColor] = useState(true)
    const [title,setTitle] = useState(" ")
    const [date,setDate] = useState(" ")
    const [description,setDescription] = useState("")
    const [titleRow,setTitleRow] = useState(1)
    const [color,setColor] = useState("")
    const [status,setStatus] = useState("未完成")
    const [statusSentence,setStatusSentence] = useState("任務進行中...")
    const [buttonWord,setButtonWord] = useState("FINISH")

    let titleWord:string
    let dateWord:string
    let descriptionWord:string
    let colorWord:string
    let statusWord:string
    let saveStatus:string
    let databaseFileName:string
    

    const dialogData = isTagsArray.filter((element:any)=>{
        if(element.index === showTagIndex){
            const startDate = `${element.yearStart}/${element.monthStart}/${element.dayStart}`
            const endDate = `${element.yearEnd}/${element.monthEnd}/${element.dayEnd}`
            dateWord = `${startDate}-${endDate}`
            titleWord = element.title
            descriptionWord = element.description
            colorWord = element.color
            databaseFileName = `${element.yearStart}Y${element.monthStart}M`
            if(element.status === "未完成"){
                statusWord = "任務進行中"
            }else{
                statusWord = "任務完成囉"
            }
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
            element.status = saveStatus
        
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
        setTagsArray(newDataArray)
    }

    const deleteHandle = ()=>{
        const dataArray = [...isTagsArray]
        const chooseCellArray = [...chooseCell]
        let startCell:number
        let connectWidth:number
        let newTagArray = dataArray.filter((element)=>{
            if(element.index !== showTagIndex){
                return element
            }else{
                if(startCell < element.id){
                    startCell = element.id
                    connectWidth = element.connectWidth
                }
            }
        })
        let endCell = startCell + connectWidth/100 - 1
        console.log(chooseCellArray)
        const newChooseCellArray = chooseCellArray.filter((element)=>{
             if(element[0] !== startCell && element[element.length-1] !== endCell){
                return element
             }
         })
         setChooseCell(newChooseCellArray)
         setTagsArray(newTagArray)
    }
    
    return(
        <div className={styles.edit_card_wrapper}>
            <div className={styles.edit_card_content}>
                <div className={styles.edit_card_decorate}>
                    <h1 className={styles.task_word}>TASK STATUS</h1>
                    <div className={styles.edit_card_pic}></div>
                    <div className={styles.task_sentence_word}>{statusSentence}</div>

                    <div className={styles.finish_button}
                             onClick={(e)=>{
                                
                                if(status === "未完成"){
                                    //setStatus("完成")
                                    saveStatus = "完成"
                                    setStatusSentence("任務完成囉")
                                    setButtonWord("任務未達")
                                }else{
                                    //setStatus("未完成")
                                    saveStatus = "未完成"
                                    setStatusSentence("任務進行中")
                                    setButtonWord("FINISH")
                                }
                                updateData()
                             }}
                        >{buttonWord}</div>
                </div>
                
                <div className={styles.list_information}>
                    <div className={styles.close_container}>
                        <div className={styles.close_button} onClick={(e)=>{setShowListDialog(false)}}>關</div>
                    </div>
                    <div className={styles.list_title_content}>
                        
                        <input type="color" 
                               style={{backgroundColor:`${color}`,cursor:`${cursorStatus}`}}
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
                                    disabled={editTitle}
                                    onChange={(e)=>{
                                        setTitle(e.target.value)
                                        if(e.target.value.length<10){
                                            setTitleRow(1)
                                        }else if(e.target.value.length>10){
                                            setTitleRow(2)
                                        }
                                    }}/>
                        <div className={styles.a_cont}></div>
                        <div className={styles.b_cont}></div>
                        <div className={styles.c_cont}></div>
                        <div className={styles.d_cont}></div>
                        <div className={styles.e_cont}></div>
                        {editTitle ? (
                            <div className={styles.description_mark_tool}
                             onClick={(e)=>{setEditTitle(false)
                                            setEditColor(false)
                                            setCursorStatus("pointer")
                        }}
                        ></div>
                        ):(
                            <div className={styles.save_word}
                                onClick={(e)=>{
                                    setEditTitle(true)
                                    setEditColor(true)
                                    setCursorStatus("default")
                                    updateData()
                                }}
                            >儲存</div>
                        )}
                        
                    </div>
                    <div className={styles.list_date}>{date}</div>
                    <div  className={styles.description_content}>
                        
                        <textarea id="edit_description_content" 
                                  value={description}
                                  cols={25} 
                                  rows={8}
                                  readOnly={editDescription}
                                  disabled={editDescription}
                                  onChange={(e)=>{
                                    setDescription(e.target.value)
                                  }}
                        />
                        {editDescription?(
                             <div className={styles.description_mark_tool}
                             onClick={(e)=>{
                                setEditDescription(false)
                             }}></div>
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
                        <div className={styles.delete_button}
                             onClick={(e)=>{
                                const result = db.deleteData(memberInformation,databaseFileName,showTagIndex)
                                result.then((msg)=>{
                                    if(msg === "success"){
                                        setShowListDialog(false)
                                        deleteHandle()
                                    }
                                })
                             }}
                        >刪除任務</div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}