import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import styles from '/public/css/member.module.css';
import db from '../../firebase/firebase';
import { memberStatus } from '../../';

export default function SingIn(props: any) {
    const emailReg = /^\w+([-+.']\w+)*@gmail\.com$/;
    const passwordReg = /^.{6,}$/;
    const { setMemberStatus } = useContext(memberStatus);
    const { setMemberInformation } = useContext(memberStatus);
    const openLogIn = props.setSignInCard;
    const openRegister = props.setRegister;
    const [passwordType, setPasswordType] = useState('password');
    const [passwordCheck, setPassWordCheck] = useState('none');
    const [emailCheck, setEmailCheck] = useState('none');
    const [inputCheck, setInputCheck] = useState('none');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    let user = {
        email: '',
        password: '',
    };
    const enterAccount = (e: any) => {
        if (!emailReg.test(email) || !passwordReg.test(password)) {
            props.setErrorCard(true);
            props.signInMsg('Check your input');
            return;
        }
        const result = db.enterAccount(email, password);
        result.then((msg) => {
            if (msg !== 'fail') {
                setMemberStatus(true);
                setMemberInformation(msg);
                navigate('/calender');
            } else {
                props.setErrorCard(true);
                props.signInMsg('Account or password incorrect');
            }
        });
    };

    const enterAccountByKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            enterAccount(e);
        }
    };

    const closeCard = (e: any) => {
        openRegister(false);
        openLogIn(false);
    };

    const showPassword = (e: any) => {
        const fak = document.getElementById('fakePass');
        fak.classList.toggle('scan');
        passwordType === 'password'
            ? setPasswordType('text')
            : setPasswordType('password');
    };

    useEffect(() => {
        if (emailReg.test(email)) {
            setEmailCheck('#03e9f4');
        } else {
            setEmailCheck('rgb(123, 123, 123)');
        }

        if (passwordReg.test(password)) {
            setPassWordCheck('#03e9f4');
        } else {
            setPassWordCheck('rgb(123, 123, 123)');
        }

        if (emailReg.test(email) && passwordReg.test(password)) {
            setInputCheck('#03e9f4');
        } else {
            setInputCheck('rgb(123, 123, 123)');
        }
    }, [email, password]);

    return (
        <div id="sing_in" className={styles.user_background}>
            <div className="user_card_box">
                <div className="user_decorate_box">
                    <div className="user_logo_pic">主</div>
                    <div>PASS CARD</div>
                </div>

                <div id="sign_in_box" className={styles.user_box_wrapper}>
                    <div className="close_icon_box">
                        <div
                            className="close_icon"
                            onClick={() => navigate('/')}
                        >
                            叉
                        </div>
                    </div>
                    <div
                        className={styles.user_box_content}
                        onKeyDown={enterAccountByKeyDown}
                    >
                        <h2 className="card_title">Sign In</h2>
                        <div>
                            <div className="user_box">
                                <input
                                    id="sign_in_email"
                                    className="user_input"
                                    type="text"
                                    name=""
                                    value={email}
                                    autoFocus={true}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required
                                />
                                <label className="user_label">Email</label>
                            </div>
                        </div>

                        <div>
                            <div className="user_box">
                                <input
                                    id="sign_in_password"
                                    className="user_input"
                                    value={password}
                                    type={passwordType}
                                    name=""
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required
                                />
                                <span className="fakePass" id="fakePass">
                                    解析密碼中....
                                </span>
                                <label className="user_label">Password</label>
                            </div>
                        </div>

                        <div className="toggle_wrapper">
                            <input
                                type="checkbox"
                                className="show_password_switch"
                                id="switch"
                            />
                            <label
                                className="show_password_label"
                                htmlFor="switch"
                                onClick={showPassword}
                            >
                                Toggle
                            </label>
                            <span className="switch_word">顯示密碼</span>
                        </div>

                        <div className="switch_card_question">
                            尚未有帳號?
                            <span
                                id="switch_register_button"
                                className="switch_card_button"
                                onClick={() => navigate('/register')}
                            >
                                註冊
                            </span>
                        </div>

                        <div className={styles.remind_word}>
                            <div style={{ color: `${emailCheck}` }}>
                                ✔信箱格式@gmail.com
                            </div>
                            <div style={{ color: `${passwordCheck}` }}>
                                ✔密碼六個字元以上
                            </div>
                            <div style={{ color: `${inputCheck}` }}>
                                ✔欄位不可空白
                            </div>
                        </div>

                        <div className="user_button_box">
                            <button
                                id="register_button"
                                className="user_button"
                                onClick={enterAccount}
                            >
                                SUBMIT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
