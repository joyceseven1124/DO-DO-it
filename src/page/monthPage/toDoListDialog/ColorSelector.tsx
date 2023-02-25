
import React, { useEffect, useState, useRef, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/toDoListDialogBox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPalette} from '@fortawesome/free-solid-svg-icons'





const ColorSelector = (props:any)=>{
    const [colorStatus,setColorStatus] = useState(true)
    const [openSelectorColor,setOpenSelectorColor] = useState(false)
    const [chooseColor,setChooseColor] = useState("#f6be21")
    return(
        <div className={styles.colors_items_container}>
            
            <div className={styles.colors_button_wrapper}>
                <FontAwesomeIcon className={styles.colors_icon} icon={faPalette} />
                <div className={styles.colors_button}
                    onClick = {(e)=>{
                        if(openSelectorColor){
                            setOpenSelectorColor(false)
                        }else{
                            setOpenSelectorColor(true)
                        }
                    }}
                > <div>Select Event Color</div>
                  <div className={styles.choose_color} style={{backgroundColor:`${chooseColor}`}}></div>
                </div>
            </div>

            {openSelectorColor ? (
                <div className={styles.colors_items}>
                    <input type="radio" name='color' id="red" value="red" 
                        onClick={(e)=>{setColorStatus(false) 
                                        props.data.color="#F56651"
                                        setChooseColor("#F56651")
                                        }}/>
                    <label htmlFor='red' className={styles.color_item_style}>紅</label>

                    <input type="radio" name='color' id="blue" value="blue" 
                        onClick={(e)=>{setColorStatus(false)
                                        props.data.color="#057499"
                                        setChooseColor("#057499")
                                        }}/>
                    <label htmlFor='blue' className={styles.color_item_style}>藍</label>

                    <input type="radio" name='color' id="yellow" value="yellow" 
                        defaultChecked={colorStatus} 
                        onClick={(e)=>{setColorStatus(true)
                                        props.data.color="#f6be21"
                                        setChooseColor("#f6be21")
                            }}/>
                    <label htmlFor='yellow' className={styles.color_item_style }>黃</label>

                    <input type="radio" name='color' id="purple" value="purple" 
                    onClick={(e)=>{setColorStatus(false)
                                props.data.color="#606A92"
                                setChooseColor("#606A92")
                    }}/>
                    <label htmlFor='purple' className={styles.color_item_style}>紫</label>

                    <input type="radio" name='color' id="green" value="green" 
                    onClick={(e)=>{setColorStatus(false)
                                props.data.color="#507a6c"
                                setChooseColor("#507a6c")
                    }}/>
                    <label htmlFor='green' className={styles.color_item_style}>綠</label>
                </div>
            ):null}
            
        </div>
    )
}

export default ColorSelector