
import React, { useEffect, useState, useRef, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/toDoListDialogBox.module.css';





const ColorSelector = (props:any)=>{
    const [colorStatus,setColorStatus] = useState(true)
    return(
        <div className={styles.colors_items_container}>
            <div className={styles.colors_items}>
                <input type="radio" name='color' id="red" value="red" 
                       onClick={(e)=>{setColorStatus(false) 
                                      props.data.color="red"
                                      }}/>
                <label htmlFor='red' className={styles.color_item_style}>紅</label>

                <input type="radio" name='color' id="green" value="green" 
                       onClick={(e)=>{setColorStatus(false)
                                      props.data.color="green"}}/>
                <label htmlFor='green' className={styles.color_item_style}>綠</label>

                <input type="radio" name='color' id="yellow" value="yellow" 
                       defaultChecked={colorStatus} 
                       onClick={(e)=>{setColorStatus(true)
                                      props.data.color="yellow"
                        }}/>
                <label htmlFor='yellow' className={styles.color_item_style }>黃</label>

                <input type="radio" name='color' id="purple" value="purple" 
                onClick={(e)=>{setColorStatus(false)
                               props.data.color="purple"
                }}/>
                <label htmlFor='purple' className={styles.color_item_style}>紫</label>
            </div>
        </div>
    )
}

export default ColorSelector