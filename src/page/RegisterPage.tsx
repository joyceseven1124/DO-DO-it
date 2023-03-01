import React, { useContext, useEffect, useState } from 'react';
import Register from './member/Register'
import SingIn from './member/SignIn';
import ErrorCard from '../components/ErrorCard';
import SuccessCard from '../components/SuccessCard';



export default function RegisterPage(){
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
            <Register 
                setErrorCard={setErrorCard}
                setSuccessCard={setSuccessCard}
                registerMsg={setMsg}
            />
        </div>
    )
} 