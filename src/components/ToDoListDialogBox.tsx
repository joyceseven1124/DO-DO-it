import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/toDoListDialogBox.module.css';
import TimeInformation from './toDoListDialog/TimeDuraction';

const closedDialog = (e:any) =>  {
    document.getElementById("toDoListDialogBox").style.display="none"
}

const writeTitleOnTag = (e:any) =>{
    if(e.target.id !== "toDoListTitle"){
        let toDoListTitle = (document.getElementById("toDoListTitle") as HTMLInputElement).value
        const cellNumber = document.getElementById("toDoListDialogBox").getAttribute("className")
        const tag = document.querySelector(`.toDoListTag-${cellNumber}`)
        if(toDoListTitle !== ""){
            tag.textContent = toDoListTitle
        }
    }
}

export default function ToDoListDialogBox(){
    return(
        <div id="toDoListDialogBox" onClick={writeTitleOnTag} className={styles.toDoListDialogBox_background}>
            <div  className={styles.toDoListDialogBox_container}>
                <div className={styles.toDoListDialogPic}>
                    <div>What do you want to do after eating</div>
                </div>
                <div className={styles.toDoListDialogBox}>
                    <div>
                        <div className={styles.close_container}>
                            <div className={styles.close_button} onClick={closedDialog}>關</div>
                        </div>
                        <div className={styles.title_container}>
                            <input id="toDoListTitle" className={styles.toDoList_title} type="text" placeholder='Add title'></input>
                            <div className={styles.under_line}></div>
                        </div>

                        <div className={styles.colors_items_container}>
                            <div className={styles.colors_items}>
                                <div className={styles.color_item_style}>紅</div>
                                <div className={styles.color_item_style}>綠</div>
                                <div className={styles.color_item_style}>黃</div>
                                <div className={styles.color_item_style}>紫</div>

                            </div>
                        </div>

                        <TimeInformation/>
                        <div className={styles.description_container}>
                            <span className={styles.description_icon}>描</span>
                            <textarea
                                name="comments"
                                rows={10}
                                cols={25}
                                placeholder={"Add description"}
                                className={styles.description}
                            ></textarea>
                        <div className={styles.description_under_line}></div>
                        </div>
                        <div className={styles.save_button_container}>
                            <div className={styles.save_button}>save</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}