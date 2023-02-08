import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/allToDoListDayDialogBox.module.css';


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
    //newNode.style.backgroundColor = "yellow";
    newNode.style.textDecoration = "line-through";
    newNode.style.textDecorationColor = "gray";
    newNode.appendChild(range.extractContents());
    range.insertNode(newNode);
}

const closeDialog = (e:any) =>{
    document.getElementById("allToDoListDayDialogBox").style.display= "none"
}




export default function AllToDoListDayDialogBox(){
    
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
                                <div className={styles.list_title}>title</div>
                                <div className={styles.list_date}>2033/2/8-2022/8/8</div>
                            </div>
                            <div  className={styles.description_content} onMouseUp={selectText}>
                                <div id="content">description</div>
                                <div className={styles.description_mark_tool}>筆</div>
                            </div>
                            
                            <div className={styles.edit_button_box}>
                                <div>編輯</div>
                                <div>刪除</div>
                            </div>
                            <div className={styles.finish_button}>任務達成</div>
                        </div>
                    </li>


                    <li className={styles.carousel__item} data-pos="-1">
                        <div className={styles.item_content}>
                            <div>title</div>
                            <div>編輯</div>
                            <div>刪除</div>
                            <div>完成</div>
                        </div>
                    </li>
                    <li className={styles.carousel__item} data-pos="1">
                        <div className={styles.item_content}>
                            <div>title</div>
                            <div>編輯</div>
                            <div>刪除</div>
                            <div>完成</div>
                        </div>
                    </li>
                    
                </ul>
            </div>
            
        </div>
    )
}