import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '/public/css/member.module.css';

const closeCard = (e:any) =>{
    console.log(e.target)
    document.getElementById("sing_in").style.display="none"
    //e.target.style.display = "none"
}

const switchRegister = (e:any) => {
    document.getElementById("sing_in").style.display="none"
    document.getElementById("register").style.display="flex"
}

export default function SingIn() {
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
                            <input id="sign_in_email" className='user_input' type="text" name=''  required/>
                            <label  className='user_label'>Email</label>
                        </div>
                    </div>

                    <div>
                        <div className='user_box'>
                            <input id="sign_in_password" className='user_input' type="password" name=''  required/>
                            <label className='user_label'>Password</label>
                        </div>
                    </div>
                    
                    <div className="toggle_wrapper">
                        <input type="checkbox" className="show_password_switch" id="switch" />
                        <label className="show_password_label" htmlFor="switch">Toggle</label>
                        <span className="switch_word">顯示密碼</span>
                    </div>
                    
                    <div className="switch_card_question">
                        尚未有帳號?
                        <span id="switch_register_button" className="switch_card_button" onClick={switchRegister}>
                            註冊</span>
                    </div>
                    <div className='user_button_box'>
                        <div id="register_button" className='user_button'>SUBMIT</div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}