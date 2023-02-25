import React, { useEffect, useState, useRef,useContext } from 'react';
import { Provider, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/editTagDialog.module.css';
import { tagData } from './MonthCell';
import {memberStatus} from "../../"
import db from "../../firebase/firebase"
import { commonData } from '../MonthPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import {faPenToSquare}  from '@fortawesome/free-solid-svg-icons'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';


export default function EditTagDialog(props:any){
    const monthNumber = useSelector(
        (state: RootState) => state.timeControlReducer.monthNumber
    );
    const yearNumber = useSelector(
         (state: RootState) => state.timeControlReducer.year
    )
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
    const [date,setDate] = useState({})
    const [description,setDescription] = useState("")
    const [titleRow,setTitleRow] = useState(1)
    const [color,setColor] = useState("")
    const [status,setStatus] = useState("未完成")
    const [statusSentence,setStatusSentence] = useState("任務進行中...")
    const [buttonWord,setButtonWord] = useState("MARK FINISH")
    const [friend,setFriend] = useState("")
    const [theme,setTheme] = useState("bubble")
    
    //const parser = new DOMParser();

    let titleWord:string
    let dateData :{ yearStart:number,yearEnd:number,
                    monthStart:number,monthEnd:number,
                    dayStart:number,dayEnd:number,
                    weekStart: string,weekEnd:string}
    let descriptionWord:any
    let colorWord:string
    let statusWord:string
    let saveStatus:string
    let databaseFileName:string
    let friendEmail:string

    const dialogData = isTagsArray.filter((element:any)=>{
        if(element.index === showTagIndex){
            const startDate = `${element.yearStart}/${element.monthStart}/${element.dayStart}`
            const endDate = `${element.yearEnd}/${element.monthEnd}/${element.dayEnd}`
            const week = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
            const weekStart = new Date(element.yearStart, 
                                       element.monthStart,
                                       element.dayStart).getDay();
            
            const weekEnd = new Date(element.yearEnd, 
                                       element.monthEnd,
                                       element.dayEnd).getDay();
            const weekStartWord = week[weekStart]
            const weekEndWord = week[weekEnd]

            dateData= {yearStart:element.yearStart,yearEnd:element.yearEnd,
                        monthStart:element.monthStart,monthEnd:element.monthEnd,
                        dayStart:element.dayStart,dayEnd:element.dayEnd,
                        weekStart: weekStartWord,weekEnd:weekEndWord}
            titleWord = element.title
            descriptionWord = element.description
            //descriptionWord = Object.values(element.description)[0]
            
            console.log(Object.values(descriptionWord)[0])
            colorWord = element.color
            databaseFileName = `${element.yearStart}Y${element.monthStart}M`
            if(element.status === "未完成"){
                statusWord = "任務進行中"
            }else{
                statusWord = "Mission accomplished! "
            }

            if(element.receiveEmail){
                if( element.receiveEmail === memberInformation){
                    friendEmail = element.sendEmail
                }else{
                    friendEmail = element.receiveEmail
                }
            }
            return element
        }
    })



    useEffect(()=>{
        setDate(dateData)
        setTitle(titleWord)
        setDescription(descriptionWord)
        setColor(colorWord)
        setStatusSentence(statusWord)
        if(statusWord !== "任務進行中"){
            setButtonWord("UNDONE")
            setStatus("完成")
        }
        if(friendEmail){
            setFriend(friendEmail)
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
        
            time = `${yearNumber}Y${monthNumber}M`
            index = element.index
            newDataArray.push(element)
            if(dialogData.length === 1){
                const result = db.updateData(memberInformation,time,index,element)
                result.then((msg)=>{
                    console.log("結果,",msg)
                })
            }
        })
        if(dialogData.length >1){
            const result = db.updateData(memberInformation,time,index,dialogData)
            result.then((msg)=>{
                    console.log("結果,",msg)
            })
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
                        <div className={styles.e_cont}></div>
                        {editTitle ? (

                            <FontAwesomeIcon icon={faPenToSquare} 
                             className={styles.description_mark_tool}
                             onClick={(e)=>{setEditTitle(false)
                                            setEditColor(false)
                                            setCursorStatus("pointer")
                        }}/>
                        ):(
                             <FontAwesomeIcon icon={faFloppyDisk}
                                className={styles.save_word}
                                onClick={(e)=>{
                                    setEditTitle(true)
                                    setEditColor(true)
                                    setCursorStatus("default")
                                    updateData()
                                }}/>
                        )}
                        
                    </div>
                    <div className={styles.list_date}>
                        <div className={styles.list_days_wrapper}>
                            <div className={styles.list_one_day_wrapper}>
                                <div className={styles.list_week}>{dateData.weekStart}</div>
                                <div className={styles.list_day}>{`${dateData.yearStart}/${dateData.monthStart}/${dateData.dayStart}`}</div>
                            </div>
                            <div>⇀</div>
                            <div className={styles.list_one_day_wrapper}>
                                <div className={styles.list_week}>{dateData.weekEnd}</div>
                                <div className={styles.list_day}>{`${dateData.yearEnd}/${dateData.monthEnd}/${dateData.dayEnd}`}</div>
                            </div>
                        </div>
                    </div>




                     {friend?(
                        <div className={styles.friend_email_container}>
                            <div>Together with</div>
                            <div className={styles.friend_email}>{friend}</div>
                        </div>
                    ):null}

                    <div className={styles.task_status_wrapper}>
                        <div className={styles.task_sentence_word}>{statusSentence}</div>
                        <div className={styles.finish_button} id={status ==="完成"?"no_finish_button":""}
                                onClick={(e)=>{
                                    if(status === "未完成"){
                                        saveStatus = "完成"
                                        updateData()
                                        //setStatus("完成")
                                        setStatusSentence("Mission accomplished!")
                                        setButtonWord("UNDONE")
                                    }else{
                                        saveStatus = "未完成"
                                        updateData()
                                        //setStatus("未完成")
                                        setStatusSentence("任務進行中")
                                        setButtonWord("MARK FINISH")
                                    }
                                }}
                            >{buttonWord}</div>
                    </div>

                    <div  className={styles.description_content}>
                        {editDescription?(
                            <>
                                <div>{parse(description)}</div>
                                <FontAwesomeIcon icon={faPenToSquare} className={styles.description_mark_tool}
                                                onClick={(e)=>{
                                                    setEditDescription(false)
                                                    setTheme("bubble")}}/>
                            </>
                        ):(
                        <>
                            <ReactQuill
                                value={"123"}
                                readOnly={false}
                                theme = {"snow"}
                                //theme={"bubble"}
                                />
                            <FontAwesomeIcon icon={faFloppyDisk} className={styles.save_word}
                                id="description_save_word"
                                onClick={(e)=>{
                                    setEditDescription(true)
                                    setTheme("snow")
                                    updateData()
                                }}/>
                        </>)}
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
                        >DELETE</div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}



/*{ <textarea id="edit_description_content"
                                  value={description}
                                  cols={25} 
                                  rows={8}
                                  readOnly={editDescription}
                                  disabled={editDescription}
                                  onChange={(e)=>{
                                    setDescription(e.target.value)
                                  }} /> }*/