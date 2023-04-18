import React from 'react';
import styles from "../../public/css/msgCard.module.css"

const ErrorCard= (props:any)=>{
    const closeCard = ()=>{
        props.setCard(false)
    }

    return(
        <div className={styles.msgCard_wrapper}>
            <div className={styles.msgCard_content}>
                <div className={styles.errorCard_title}>Fail</div>
                <div className={styles.errorCard_information}>{props.msg}</div>
                <div className={styles.msgCard_button} onClick={closeCard}>OK</div>
            </div>
        </div>
    )
}


export default ErrorCard