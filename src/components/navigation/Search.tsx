import React from 'react';
import styles from '/public/css/navigationBar.module.css';

const searchKeyWord = (e:any) => {
    document.getElementById("search").style.boxShadow = "0px 0px 7px 3px var(--nowTimeBgColor)"
}   

const test = (e:any) => {
    document.getElementById("search").style.border = "none"
}

const Search = () => (
    <div id="search" className={styles.search} >
        <div className={styles.search_button}>搜</div>
        <input
            placeholder="搜尋"
            maxLength={40}
            className={styles.search_input}
            onFocus={searchKeyWord}
            onBlur={test}
        ></input>
    </div>
);

export default Search;
