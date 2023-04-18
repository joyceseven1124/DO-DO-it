import React, { useContext, useEffect, useState } from 'react';
import Register from './member/Register'
import ErrorCard from '../components/ErrorCard';
import SuccessCard from '../components/SuccessCard';

export default function RegisterPage(){
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