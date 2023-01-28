import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/toDoListDialogBox.module.css';

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
        <div id="toDoListDialogBox" onClick={writeTitleOnTag} className={styles.toDoListDialogBox_container}>
            <div className={styles.toDoListDialogBox}>
                <div className={styles.close_container}>
                    <div className={styles.close_button} onClick={closedDialog}>關</div>
                </div>
                <div className={styles.title_container}>
                    <input id="toDoListTitle" className={styles.toDoList_title} type="text" placeholder='Add title'></input>
                    <div className={styles.under_line}></div>
                </div>
                <div className={styles.time_container}>
                    <span className={styles.time_icon}>時</span>
                    <div className={styles.time_information}>
                        <span>Feb 8,2023</span>
                        <span>12:00am</span>
                        <span>all day</span>
                        <input type={"checkbox"}></input>
                    </div>
                </div>
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
    )
}