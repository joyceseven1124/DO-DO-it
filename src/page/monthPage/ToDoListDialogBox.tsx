import React, { useEffect, useState, useRef,useContext } from 'react';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/toDoListDialogBox.module.css';
import TimeInformation from './toDoListDialog/TimeDuraction';
import ColorSelector from './toDoListDialog/ColorSelector';
import { tagData } from './MonthCell';
import { memberStatus } from "../../"
import db from "../../firebase/firebase"
import { v4 as uuidv4 } from "uuid";
import { commonData } from '../MonthPage';

const remindWriteTitleWord = ()=>{

}

const writeTitleOnTag = (e:any) =>{

}

export default function ToDoListDialogBox(props:any){
    const closedDialog = (e:any) =>  {
        props.setCardStatus(false)
        setShowRemind("none")
        let newData = [...isTagsArray]
        let newChooseCell = [...chooseCell]
        const cleanTags = Math.abs(startRow-endRow)+1
            for(let i=0 ; i<cleanTags;i++){
                newData.pop()
                newChooseCell.pop()
        }
        setTagsArray(newData)
        setChooseCell(newChooseCell)
        //let emendArray = [...isTagsArray]
        //emendArray.pop()
        //setTagsArray(emendArray)
        //let emendChooseCell = [...chooseCell]
        //emendChooseCell.pop()
        //setChooseCell(emendChooseCell)
    }

    const saveData = (e:any) => {
        let time = `${toDoListData.yearStart}Y${toDoListData.monthStart}M`
        if(toDoListData.title === ""){
            setShowRemind("block")
            return
        }
        if(memberNowStatus){
            //let yearChangeDay = Math.abs(Number(toDoListData.yearEnd)-Number(toDoListData.yearStart))
            //if(toDoListData.yearEnd-toDoListData.yearStart)
            //const [saveResult,setSaveResult] = useState(false)
            let newData = [...isTagsArray]
  
            const cleanTags = Math.abs(startRow-endRow)+1
            for(let i=0 ; i<cleanTags;i++){
                newData.pop()
            }
            if(tagIdWidthArray.length>1){
                let sendData:any = []
                let uuidDate = new Date().getTime().toString();
                //const uuid = uuidv4()
                tagIdWidthArray.forEach((element)=>{
                    let moreRowsListData={
                        title:toDoListData.title,
                        color:toDoListData.color,
                        yearStart:toDoListData.yearStart,
                        yearEnd:toDoListData.yearEnd,
                        monthStart:toDoListData.monthStart,
                        monthEnd:toDoListData.monthEnd,
                        dayStart:toDoListData.dayStart,
                        dayEnd:toDoListData.dayEnd,
                        description:toDoListData.description,
                        status:toDoListData.status,
                        //index:uuid,
                        index:uuidDate,
                        id:element[0],
                        connectWidth:toDoListData.connectWidth,
                        width:element[1]
                    }
                    newData.push(moreRowsListData)
                    sendData.push(moreRowsListData)
                })
                //const result = db.saveToDoList(time,sendData,uuid)
                const result = db.saveToDoList(time,sendData,uuidDate)
                result.then((msg)=>{
                    if(msg === "success"){
                        props.setCardStatus(false)
                        //newData.push(sendData)
                        setTagsArray(newData)
                    }
                })
            }else if(tagIdWidthArray.length === 1){
                //db.saveToDoList(time,toDoListData,index)
               // const result = db.saveToDoList(time,toDoListData,index)
               const result = db.saveToDoList(time,toDoListData,uuidDate)
                result.then((msg)=>{
                    if(msg === "success"){
                        props.setCardStatus(false)
                        newData.push(toDoListData)
                        setTagsArray(newData)
                    }
                })
            }
            
            //db.saveToDoList(time,toDoListData,index)
        }
    }
    const { memberNowStatus } = useContext(memberStatus)
    const {memberInformation} = useContext(memberStatus)
    const { tagStartCell } = useContext(tagData);
    const { tagEndCell } = useContext(tagData);
    const { setTagsArray } = useContext(commonData);
    const { isTagsArray } = useContext(commonData);
    const { setChooseCell } = useContext(commonData);
    const { chooseCell } = useContext(commonData);
    const { searchMonth } = useContext(tagData);
    const [showRemind,setShowRemind] = useState("none")
    //const [data,setData] = useState()
    let uuidDate = new Date().getTime().toString();
    let toDoListData = {title:"",
                        color:"#FDCD47",
                        yearStart:"",
                        yearEnd:"",
                        monthStart:"",
                        monthEnd:"",
                        dayStart:"",
                        dayEnd:"",
                        description:"",
                        status:"未完成",
                        //index:index,
                        index:uuidDate,
                        id:0,
                        connectWidth:0,
                        width:0}

    let tagArray = [...isTagsArray]
    const perRowStartNumber = [1, 8, 15, 22, 29, 36];
    let startRow = Math.ceil(tagStartCell/7)
    let endRow = Math.ceil(tagEndCell/7)
    let width:number
    let connectWidth:number = (Math.abs(tagStartCell - tagEndCell)+1)*100
    let tagId:number
    type Tuple = [number, number];
    let tagIdWidthArray:Tuple[]=[]
    let title:string =""
    let description:string =""
    toDoListData.connectWidth = connectWidth
    
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
            //const tagItem = {[tagId]:[width,title,description,connectWidth]}
            tagIdWidthArray.push([tagId,width])
            const tagItem = {id:tagId,width:width,title:title,description:description,connectWidth:connectWidth,color:toDoListData.color}
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
            tagIdWidthArray.push([tagId,width])
            //const tagItem = {[tagId]:width}
             const tagItem = {id:tagId,width:width,title:title,description:description,connectWidth:connectWidth,color:toDoListData.color}
            //const tagItem = {[tagId]:[width,title,description,connectWidth]}
            tagArray.push(tagItem)
        }

    }else{
        if(tagStartCell > tagEndCell){
            tagId = tagEndCell
        }else{
            tagId = tagStartCell
        }
        
        width = (Math.abs(tagStartCell-tagEndCell)+1)*100
        tagIdWidthArray.push([tagId,width])
        toDoListData.id = tagId
        const tagItem = {id:tagId,width:width,title:title,description:description,connectWidth:connectWidth,color:toDoListData.color}
        tagArray.push(tagItem)
    }
    toDoListData.width = width
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
                                   onChange={(e)=>{
                                    if(e.target.value !== ""){
                                        toDoListData.title=e.target.value
                                        setShowRemind("none")
                                    }else{
                                        setShowRemind("block")
                                    }}}
                             
                                   />
                            <div className={styles.under_line}></div>
                            <div className={styles.remind_word} style={{display:showRemind}}>請填寫標題⬆</div>
                        </div>

                        <ColorSelector data={toDoListData}/>

                        <TimeInformation month={searchMonth} data={toDoListData}/>
                        <div className={styles.description_container}>
                            <span className={styles.description_icon}>描</span>
                            <textarea
                                name="comments"
                                rows={10}
                                cols={25}
                                placeholder={"Add description"}
                                className={styles.description}
                                onChange={(e)=>{
                                    if(e.target.value !== ""){
                                        toDoListData.description=e.target.value
                                    }
                                }}
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