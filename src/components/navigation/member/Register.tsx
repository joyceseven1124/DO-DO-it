import React,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { RootState } from '../../../store/index';
//import { addTime, minusTime } from '../../../store/action/timeControl';
import styles from '/public/css/member.module.css';
import db from "../../../firebase/firebase"







export default function Register(props:any) {
    const openRegister = props.setRegister
    const openLogIn = props.setSignInCard
    const [passwordType,setPasswordType] = useState("password")
    //記得正規化檢查輸入的東西
    let user = {
    email: "",
    password: "",
    name:"",
    };
     const switchSignIn = (e:any) => {
        openRegister(false)
        openLogIn(true)
    }

    const closeCard = (e:any) =>{
        openRegister(false)
        openLogIn(false)
    }




    const buildAccount = (e:any) =>{
        console.log(user)
        if(user.email !== "" && user.password !==""){
            db.buildAccount(user.email,user.password,user.name)
        }
    }

    const showPassword = (e:any) =>{
        const fak = document.getElementById('fakePass');
        fak.classList.toggle('scan');
	   (passwordType ==='password') ? setPasswordType("text") : setPasswordType("password");
    }

    return (
        <div id="register" className={styles.user_background}>
            <div className= "user_card_box">
                <div className= "user_decorate_box">
                    <div className= "user_logo_pic">主</div>
                    <div>PASS CARD</div>
                </div>
                <div id="register_box" className={styles.user_box}>
                    <div className='close_icon_box'>
                        <div className='close_icon' onClick={closeCard}>叉</div>
                    </div>
                    <h2 className="card_title">Register</h2>
                    <div>
                        <div className='user_box'>
                            <input  id="register_name" 
                                    className='user_input' 
                                    type="text" 
                                    name=''  
                                    required
                                    autoFocus={true}
                                    onChange={(e)=>{user.name = e.target.value}}
                                    />
                            <label className='user_label'>Username</label>
                        </div>
                    </div>

                    <div>
                        <div className='user_box'>
                            <input  id="register_email" 
                                    className='user_input' 
                                    type="text" 
                                    name=''  
                                    required
                                    onChange={(e)=>{user.email = e.target.value}}/>
                            <label  className='user_label'>Email</label>
                        </div>
                    </div>

                    <div>
                        <div className='user_box'>
                            <input  id="register_password" 
                                    className='user_input' 
                                    type={passwordType} 
                                    name=''  
                                    required
                                    onChange={(e)=>{user.password = e.target.value}}
                                    />
                            <span className="fakePass" id="fakePass">解析密碼中....</span>
                            <label className='user_label'>Password</label>
                        </div>
                    </div>

                    <div className="toggle_wrapper">
                        <input type="checkbox" className="show_password_switch" id="switch" onClick={showPassword}/>
                        <label className="show_password_label" htmlFor="switch">Toggle</label>
                        <span className="switch_word">顯示密碼</span>
                    </div>

                    <div className="switch_card_question">
                        已有帳號?
                        <span id="switch_login_button" className='switch_card_button' onClick={switchSignIn}>
                            登入
                        </span>
                    </div>
                    <div className='user_button_box'>
                        <div id="register_button" className='user_button' onClick={buildAccount}>SUBMIT</div>
                    </div>
                </div>
            </div>
            
        </div>
        
    );
}