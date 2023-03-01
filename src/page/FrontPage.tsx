import React, { useEffect, useState,createContext } from 'react';
import styles from '/public/css/frontPage.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function FrontPage(props:any){
    const navigate = useNavigate();
    return(

        <div className={styles.front_background_container}>
            <div className={styles.front_container}>
                <div className={styles.introduction_container}>
                    <div className={styles.app_name}>DO DO it</div>
                    <div className={styles.app_introduction}>
                        Are you tired of forgetting important dates and missing out on events? 
                        Look no further than our amazing calendar! 
                        Our calendar is the perfect tool to keep you organized and on top of your schedule.
                    </div>

                    <div  className={styles.app_introduction}>
                        Our calendar is beautifully designed .
                        With plenty of space to write down appointments, meetings,
                        and deadlines, you'll never miss an important date again.
                    </div>

                    <div  className={styles.app_introduction}>
                        Now ,take control of your time!
                    </div>
                    
                    <div className={styles.button_wrapper}>
                        <button
                            className={styles.register_button}
                            onClick={()=>navigate('/register')}
                        >Register</button>
                        <button className={styles.logIn_button}
                            onClick={()=>navigate('/logIn')}
                        >Sign In</button>
                    </div>
                </div>
                <div className={styles.front_pic}></div>
            </div>

            <div  className={styles.feature_box_wrapper}>
                
                <div className={styles.feature_box}>
                    <div className={styles.note_pic}></div>
                    <div>Write content</div>
                    <div className={styles.description_title}>
                        Click on the empty space in the calendar to write your schedule.
                        After writing, a label will be generated in the calendar.</div>
                </div>

                <div className={styles.feature_box}>
                    <div className={styles.drag_pic}></div>
                    <div>Drag & Drop</div>
                    <div className={styles.description_title}>
                        The labels in the calendar can be freely 
                        dragged to other date cells.</div>
                </div>

                <div className={styles.feature_box}>
                    <div className={styles.friend_pic}></div>
                    <div>Co-edit tags</div>
                    <div className={styles.description_title}>
                        The content recorded in the labels can be 
                        collaboratively edited with others.</div>
                </div>

                <div className={styles.feature_box}>
                    <div className={styles.rwd_pic}></div>
                    <div>RWD</div>
                    <div className={styles.description_title}>
                        Different device sizes have their 
                        own layout arrangements.</div>
                </div>
            </div>

            <Footer/>
        </div>
        
    )
}