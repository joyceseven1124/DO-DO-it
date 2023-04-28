import React from 'react';
import styles from "../../public/css/saveSuccessBlock.module.css"

interface Props {
  msg:string
}

const SaveSuccessBlock= (props:Props)=>{
    return(
        <div className={styles.msgCard_wrapper}>
            <div className={styles.msgCard_content}>
                <div className={styles.errorCard_information}>{props.msg}</div>
            </div>
        </div>
    )
}

export default SaveSuccessBlock