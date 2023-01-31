import React from 'react';
import styles from '/public/css/navigationBar.module.css';
import ChangeTime from './navigation/ChangeTime';
import Search from './navigation/Search';
import ChangeTimeItem from './navigation/ChangeTimeItem';
import { NEXT_MONTH } from '../store/action/timeControl';

const openCard = (e:any) => {
    document.getElementById("sing_in").style.display = "flex"
}

const NavigationBar = () => (
    <nav className={styles.nav_container}>
        <div  className={styles.nav_bar}>
            <div className="nav_group">
                <div className={styles.app_icon}>主</div>
            </div>
            <div className="nav_group">
                <ChangeTime />
                <Search />
            </div>
            <div className="nav_group">
                <ChangeTimeItem />
                <div className={styles.login} onClick={openCard}>登入</div>
            </div>
        </div>
    </nav>
);

export default NavigationBar;
