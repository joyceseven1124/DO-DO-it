import React from 'react';
import styles from '/public/css/navigationBar.module.css';
import ChangeTime from './navigation/ChangeTime';
import Search from './navigation/Search';
import ChangeTimeItem from './navigation/ChangeTimeItem';
import { NEXT_MONTH } from '../store/action/timeControl';

let NavigationBar = () => (
    <nav className={styles.nav_container}>
        <div  className={styles.nav_bar}>
            <div className="nav_group">
                <div className={styles.burger_icon}>堡</div>
                <div>DO DO it</div>
            </div>
            <div className="nav_group">
                <ChangeTime />
                <Search />
            </div>
            <div className="nav_group">
                <ChangeTimeItem />
                <div>使用者</div>
            </div>
        </div>
    </nav>
);

export default NavigationBar;
