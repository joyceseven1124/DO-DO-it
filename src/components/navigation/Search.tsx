import React from 'react';
import styles from '/public/css/navigationBar.module.css';

let Search = () => (
    <div className={styles.search}>
        <div className={styles.search_button}>搜</div>
        <input
            placeholder="搜尋"
            maxLength={40}
            className={styles.search_input}
        ></input>
    </div>
);

export default Search;
