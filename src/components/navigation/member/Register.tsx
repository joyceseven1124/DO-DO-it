import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { RootState } from '../../../store/index';
//import { addTime, minusTime } from '../../../store/action/timeControl';
import styles from '/public/css/member.module.css';

const closeCard = (e:any) =>{
    document.getElementById("register").style.display="none"
    //e.target.style.display = "none"
}

const switchSignIn = (e:any) => {
    document.getElementById("sing_in").style.display="flex"
    document.getElementById("register").style.display="none"
}

export default function Register() {
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
                            <input id="register_name" className='user_input' type="text" name=''  required/>
                            <label className='user_label'>Username</label>
                        </div>
                    </div>

                    <div>
                        <div className='user_box'>
                            <input id="register_email" className='user_input' type="text" name=''  required/>
                            <label  className='user_label'>Email</label>
                        </div>
                    </div>

                    <div>
                        <div className='user_box'>
                            <input id="register_password" className='user_input' type="password" name=''  required/>
                            <label className='user_label'>Password</label>
                        </div>
                    </div>

                    <div className="toggle_wrapper">
                        <input type="checkbox" className="show_password_switch" id="switch" />
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
                        <div id="register_button" className='user_button'>SUBMIT</div>
                    </div>
                </div>
            </div>
            
        </div>
        
    );
}