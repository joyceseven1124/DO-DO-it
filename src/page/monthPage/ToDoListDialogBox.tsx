import React, { useEffect, useState, useRef,useContext } from 'react';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/toDoListDialogBox.module.css';
import TimeInformation from './toDoListDialog/TimeDuraction';
import ColorSelector from './toDoListDialog/ColorSelector';
import { tagData } from './MonthCell';
import db from "../../firebase/firebase"



const writeTitleOnTag = (e:any) =>{

}

export default function ToDoListDialogBox(props:any){
    const closedDialog = (e:any) =>  {
    props.setCardStatus(false)
    }

    const saveData = (e:any) => {
        console.log(toDoListDate)
    }

    const { tagStartCell } = useContext(tagData);
    const { tagEndCell } = useContext(tagData);
    const { setTagsArray } = useContext(tagData);
    const { isTagsArray } = useContext(tagData);
    const { searchMonth } = useContext(tagData);
    //const [data,setData] = useState()
    let toDoListDate = {title:"",color:"",yearStart:"",yearEnd:"",monthStart:"",monthEnd:"",dayStart:"",dayEnd:"",description:"",daylong:"",dayStartCell:""}

    let tagArray = [...isTagsArray]
    const perRowStartNumber = [1, 8, 15, 22, 29, 36];
    let startRow = Math.ceil(tagStartCell/7)
    let endRow = Math.ceil(tagEndCell/7)
    let width:number
    let connectWidth:number = (Math.abs(tagStartCell - tagEndCell)+1)*100
    let tagId:number
    let title:string =""
    let description:string =""
    if(startRow < endRow){
        for(let i = startRow; i<= endRow ; i++ ){
            if(i ===startRow){
                tagId = tagStartCell
                width = (Math.abs(tagStartCell - startRow * 7) +1) *100;
            }else if(i=== endRow){
                tagId = perRowStartNumber[i-1]
                width = (Math.abs(tagEndCell - (endRow * 7 - 6)) +1) *100;
            }else{
                tagId = perRowStartNumber[i-1]
                width = 700
            }
            //const tagItem = {[tagId]:width}
            const tagItem = {[tagId]:[width,title,description,connectWidth]}
            tagArray.push(tagItem)
        }
    }else if( startRow> endRow){
        for(let i = endRow; i<=startRow  ; i++ ){
            if(i ===startRow){
                tagId = perRowStartNumber[i-1]
                width = (Math.abs(tagStartCell - i * 7 + 6) + 1) *100;
            }else if(i=== endRow){
                tagId = tagEndCell
                width = (Math.abs(tagEndCell - endRow * 7) +1) *100;
            }else{
                tagId = perRowStartNumber[i-1]
                width = 700
            }

            //const tagItem = {[tagId]:width}
            const tagItem = {[tagId]:[width,title,description,connectWidth]}
            tagArray.push(tagItem)
        }

    }else{
        if(tagStartCell > tagEndCell){
            tagId = tagEndCell
        }else{
            tagId = tagStartCell
        }
        width = (Math.abs(tagStartCell-tagEndCell)+1)*100
        const tagItem = {[tagId]:[width,title,description,connectWidth]}
        tagArray.push(tagItem)
    }
    
    useEffect(()=>{
        if(props.status === true){
            setTagsArray(tagArray)
        }
    },[props.status])


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
                            <input 
                                   autoFocus={true}
                                   id="toDoListTitle" 
                                   className={styles.toDoList_title} 
                                   type="text" 
                                   placeholder='Add title'
                                   />
                            <div className={styles.under_line}></div>
                        </div>

                        <ColorSelector data={toDoListDate}/>

                        <TimeInformation month={searchMonth} data={toDoListDate}/>
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
                            <div className={styles.save_button} onClick={saveData}>save</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
//db.saveToDoList()