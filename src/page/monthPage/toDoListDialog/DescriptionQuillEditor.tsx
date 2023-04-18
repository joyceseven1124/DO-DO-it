import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '/public/css/toDoListDialogBox.module.css';
import {faAlignLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function DescriptionQuillEditor(props:any) {
  const [value, setValue] = useState('');
  

  return(
    <div className={styles.description_container}>
      <div className={styles.description_wrapper}>
          <FontAwesomeIcon icon={faAlignLeft} className={styles.description_icon}/>
          <ReactQuill theme="snow" value={value} 
                      onChange={(val)=>{setValue(val)
                        props.data.description = val
                      }}
                      />
      </div>
    </div>
  )
}



export default DescriptionQuillEditor;