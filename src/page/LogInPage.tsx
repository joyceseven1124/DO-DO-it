import React, { useState } from 'react';
import SingIn from './member/SignIn';
import ErrorCard from '../components/ErrorCard';
import SuccessCard from '../components/SuccessCard';



export default function LogInPage(){
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
            <SingIn
                setErrorCard={setErrorCard}
                setSuccessCard={setSuccessCard}
                setSignInMsg={setMsg}
            />
        </div>
    )
} 
