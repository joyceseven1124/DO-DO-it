import React, { useEffect, useState, useRef, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/toDoListDialogBox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPalette} from '@fortawesome/free-solid-svg-icons'
import {faUserGroup} from '@fortawesome/free-solid-svg-icons'



function AddGuest(props:any) {
  const [value, setValue] = useState('');
  

  return <>
            <div className={styles.add_guest_container}>
                <div className={styles.add_guest_wrapper}>
                    <FontAwesomeIcon icon={faUserGroup} className={styles.add_guest_icon}/>
                    <div className={styles.add_guest_button}>Add guest</div>
                </div>
            </div>
        </>
}



export default AddGuest;