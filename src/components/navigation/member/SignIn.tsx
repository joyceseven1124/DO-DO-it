import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '/public/css/member.module.css';
import db from "../../../firebase/firebase"
import {memberStatus} from "../../../index"





export default function SingIn(props:any) {
    const {memberNowStatus} = useContext(memberStatus)
    const {setMemberStatus} = useContext(memberStatus)
    const openLogIn = props.setSignInCard
    const openRegister = props.setRegister
    const [passwordType,setPasswordType] = useState("password")
    let user = {
        email:"",
        password:""
    }
    const enterAccount = (e:any)=>{
        const result = db.enterAccount(user.email,user.password)
        result.then((msg)=>{
            if(msg === "success"){
                setMemberStatus(true)
                openLogIn(false)
            }
        })
    }
    const switchRegister = (e:any) => {
        openRegister(true)
        openLogIn(false)
    }

    const closeCard = (e:any) =>{
        openRegister(false)
        openLogIn(false)
    }

    const showPassword = (e:any) =>{
        const fak = document.getElementById('fakePass');
        fak.classList.toggle('scan');
	    (passwordType ==='password') ? setPasswordType("text") : setPasswordType("password");
    }
    return (
        <div id="sing_in" className={styles.user_background}>
            <div className= "user_card_box">
                <div className= "user_decorate_box">
                    <div className= "user_logo_pic">主</div>
                    <div>PASS CARD</div>
                </div>
                <div id="sign_in_box" className={styles.user_box}>
                    <div className='close_icon_box'>
                        <div className='close_icon' onClick={closeCard}>叉</div>
                    </div>
                    <h2 className="card_title">Sign In</h2>

                    <div>
                        <div className='user_box'>
                            <input  id="sign_in_email" 
                                    className='user_input' 
                                    type="text" 
                                    name=''
                                    autoFocus={true}
                                    onChange={(e)=>{user.email=e.target.value}}
                                    required/>
                            <label  className='user_label'>Email</label>
                        </div>
                    </div>

                    <div>
                        <div className='user_box'>
                            <input  id="sign_in_password"
                                    className='user_input'
                                    type={passwordType}
                                    name=''
                                    onChange={(e)=>{user.password=e.target.value}}
                                    required/>
                            <span className="fakePass" id="fakePass">解析密碼中....</span>
                            <label className='user_label'>Password</label>
                        </div>
                    </div>
                    
                    <div className="toggle_wrapper">
                        <input type="checkbox" className="show_password_switch" id="switch" />
                        <label className="show_password_label" htmlFor="switch" onClick={showPassword}>Toggle</label>
                        <span className="switch_word">顯示密碼</span>
                    </div>
                    
                    <div className="switch_card_question">
                        尚未有帳號?
                        <span id="switch_register_button" className="switch_card_button" onClick={switchRegister}>
                            註冊</span>
                    </div>
                    <div className='user_button_box'>
                        <div id="register_button" className='user_button' onClick={enterAccount}>SUBMIT</div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}