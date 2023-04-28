
import React, {useState} from 'react';
import styles from '/public/css/toDoListDialogBox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPalette} from '@fortawesome/free-solid-svg-icons'

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
  data:TagData
}




const ColorSelector = (props:Props)=>{
    const [openSelectorColor,setOpenSelectorColor] = useState(false)
    const [chooseColor,setChooseColor] = useState("#f6be21")
    const [rotate,setRotate] = useState("0")
    const [colorButtonWord,setColorButtonWord] = useState("+")
    return(
        <div className={styles.colors_items_container}>
           
            <div className={styles.colors_button_wrapper}>
                <FontAwesomeIcon className={styles.colors_icon} icon={faPalette} />
                <button className={styles.colors_button}
                    onClick = {(e)=>{
                        if(openSelectorColor){
                            setOpenSelectorColor(false)
                            setColorButtonWord("+")
                        }else{
                            setOpenSelectorColor(true)
                            setColorButtonWord("-")
                        }
                        let rotateDeg = "0"
                        if(rotate === "0"){
                            rotateDeg = "-180"
                        }
                        setRotate(rotateDeg)
                    }}
                >
                    <div className={styles.word_and_circle}>
                        <div>Select Event Color</div>
                        <div className={styles.choose_color} style={{backgroundColor:`${chooseColor}`}}></div>
                    </div>
                    <div
                        style={{transform: `rotate(${rotate}deg)`,
                                transition: "transform 0.6s",
                            }}
                        className={styles.arrow}>
                            {colorButtonWord}
                    </div>
                </button>
            </div>

            {openSelectorColor ? (
                <>
                    <div className={styles.colors_menu_bg} onClick={(e)=>{
                        setOpenSelectorColor(false)
                        setColorButtonWord("+")
                        let rotateDeg = "0"
                        if(rotate === "0"){
                            rotateDeg = "-180"
                        }
                        setRotate(rotateDeg)
                    }}></div>
                    <div className={styles.colors_items}>
                        <input type="radio" name='color' id="red" value="red"
                            defaultChecked={chooseColor === "#F56651" ?true:false}
                            onClick={(e)=>{
                                            props.data.color="#F56651"
                                            setChooseColor("#F56651")
                                            }}/>
                        <label htmlFor='red' className={styles.color_item_style}>紅</label>

                        <input type="radio" name='color' id="blue" value="blue"
                            defaultChecked={chooseColor === "#057499" ?true:false}
                            onClick={(e)=>{
                                            props.data.color="#057499"
                                            setChooseColor("#057499")
                                            }}/>
                        <label htmlFor='blue' className={styles.color_item_style}>藍</label>

                        <input type="radio" name='color' id="yellow" value="yellow" 
                            defaultChecked={chooseColor === "#f6be21"?true:false}
                            onClick={(e)=>{
                                            props.data.color="#f6be21"
                                            setChooseColor("#f6be21")
                                }}/>
                        <label htmlFor='yellow' className={styles.color_item_style }>黃</label>

                        <input type="radio" name='color' id="purple" value="purple"
                        defaultChecked={chooseColor === "#606A92" ?true:false}
                        onClick={(e)=>{
                                    props.data.color="#606A92"
                                    setChooseColor("#606A92")
                        }}/>
                        <label htmlFor='purple' className={styles.color_item_style}>紫</label>

                        <input type="radio" name='color' id="green" value="green"
                        defaultChecked={chooseColor === "#507a6c" ?true:false}
                        onClick={(e)=>{
                                    props.data.color="#507a6c"
                                    setChooseColor("#507a6c")
                        }}/>
                        <label htmlFor='green' className={styles.color_item_style}>綠</label>
                    </div>
                </>
            ):null}
        </div>
    )
}

export default ColorSelector