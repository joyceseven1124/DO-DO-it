import React, { useEffect, useState, useRef,useContext } from 'react';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/allToDoListDayDialogBox.module.css';
import { tagData } from './MonthCell';


function selectText(){
    let selection;
    if (document.getSelection) {
    selection = document.getSelection();
    }//支援IE 
    else if ((document as any).selection) {
    selection = (document as any).selection;
    }
    const range = selection.getRangeAt(0);
    const newNode = document.createElement("span");
    newNode.style.backgroundColor = "yellow";
    //newNode.style.textDecoration = "line-through";
    newNode.style.textDecorationColor = "gray";
    newNode.appendChild(range.extractContents());
    range.insertNode(newNode);
}






export default function AllToDoListDayDialogBox(props:any){
    const { setShowListDialog } = useContext(tagData)
    const {isTagsArray} = useContext(tagData)
    const {showTagIndex} = useContext(tagData)
    const [title,setTitle] = useState(" ")
    const [date,setDate] = useState(" ")
    const [description,setDescription] = useState("")
    let titleWord:string
    let dateWord:string
    let descriptionWord:string
    const closeDialog = (e:any) =>{
        setShowListDialog(false)
    }
   
    const dialogData = isTagsArray.filter((element:any)=>{
        console.log(element.index === showTagIndex)
        let count = 0
        if(element.index === showTagIndex){
            count++
            if(count>1){
                return
            }
            console.log(element.title)
            const startDate = `${element.yearStart}/${element.monthStart}/${element.dayStart}`
            const endDate = `${element.yearEnd}/${element.monthEnd}/${element.dayEnd}`
            dateWord = `${startDate}-${endDate}`
            titleWord = element.title
            descriptionWord = element.description
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
    },[])
    

    console.log(showTagIndex)
    return(
        <div id="allToDoListDayDialogBox" className={styles.dialog_background}>
            <div className={styles.carousel_card}>
                <div className={styles.close_icon} onClick={closeDialog}>關掉</div>
                <ul className={styles.carousel__list}>
                    <li className={styles.carousel__item} data-pos="0">
                        <div className={styles.item_content}>
                            <h3>任務清單</h3>
                            <div className={styles.card_pic}>p</div>
                            <div className={styles.list_information}>
                                <div className={styles.list_title}>{title}</div>
                                <div className={styles.list_date}>{date}</div>
                            </div>
                            <div  className={styles.description_content} onMouseUp={selectText}>
                                <div id="content">{description}</div>
                                <div className={styles.description_mark_tool}>筆</div>
                            </div>
                            
                            <div className={styles.edit_button_box}>
                                <div>編輯</div>
                                <div>刪除</div>
                            </div>
                            <div className={styles.finish_button}>任務達成</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}