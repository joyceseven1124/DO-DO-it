import React, { useContext, useEffect, useState } from 'react';
import Register from './member/Register'
import SingIn from './member/SignIn';
import ErrorCard from '../components/ErrorCard';
import SuccessCard from '../components/SuccessCard';



export default function LogInPage(){
    const [signInCardStatus,setSignInCardStatus] = useState(true)
    const [registerCardStatus,setRegisterCardStatus] = useState(false)
    const [errorCardShow,setErrorCard] = useState(false)
    const [successCardShow,setSuccessCard] = useState(false)
    const [msg,setMsg] = useState("")

    return(
        <div>
            
            {successCardShow? (<>
            <SuccessCard msg={msg} setCard={setSuccessCard}/>
            </>) : null}
            {errorCardShow? (<>
            <ErrorCard msg={msg} setCard={setErrorCard}/>
            </>) : null}
            {signInCardStatus? (<>
            <SingIn setRegister={setRegisterCardStatus} 
                    registerStatus={registerCardStatus}
                    setSignInCard={setSignInCardStatus}
                    signStatus={signInCardStatus}
                    setErrorCard={setErrorCard}
                    setSuccessCard={setSuccessCard}
                    signInMsg={setMsg}/>
            </>) : null}
            {registerCardStatus? (<>
            <Register setRegister={setRegisterCardStatus} 
                    registerStatus={registerCardStatus}
                    setSignInCard={setSignInCardStatus}
                    signStatus={signInCardStatus}
                    setErrorCard={setErrorCard}
                    setSuccessCard={setSuccessCard}
                    registerMsg={setMsg}/></>) : null}
        </div>
    )
} 

//  <div className={styles.teach_information}>
//     <div className={styles.teach_pic}>圖</div>
//     <div></div>
//     <div className={styles.step_one}></div>
//     <div className={styles.step_two}></div>
//     <div className={styles.step_three}></div>
//     <div className={styles.step_}></div>
// </div>