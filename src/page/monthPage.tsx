import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '/public/css/monthPage.module.css';
import MonthCell from './monthPage/MonthCell';
import { RootState } from '../store';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import db from "../firebase/firebase"
import AllToDoListDayDialogBox from './monthPage/AllToDoListDayDialogBox';

function MonthPage() {
    //let x =  db.getToDoListData()
    return (
        <div className={styles.monthPage_background}>
            <NavigationBar/>
            <div className={styles.monthPage_container}>
                <div>
                    <div className={styles.week_container}>
                        <ul className={styles.week_title}>
                            <ol className="week">MON</ol>
                            <ol className="week">TUE</ol>
                            <ol className="week">WED</ol>
                            <ol className="week">THU</ol>
                            <ol className="week">FRI</ol>
                            <ol className="week">SAT</ol>
                            <ol className="week">SUN</ol>
                        </ul>
                    </div>
                    <MonthCell />
                </div>
                <SideBar/>
            </div>
            <Footer/>
        </div>
    );
}

export default MonthPage;
