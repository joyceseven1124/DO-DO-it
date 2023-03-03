import React from 'react';
import styled from 'styled-components';
import styles from "../../public/css/msgCard.module.css"

const SuccessCard= (props:any)=>{
    const closeCard = ()=>{
        props.setCard(false)
    }

    return(
        <div className={styles.msgCard_wrapper}>
            <div className={styles.msgCard_content}>
                <div className={styles.successCard_title}>Success</div>
                <div className={styles.successCard_information}>{props.msg}</div>
                <div className={styles.msgCard_button} onClick={closeCard}>OK</div>
            </div>
        </div>
    )
}

export default SuccessCard