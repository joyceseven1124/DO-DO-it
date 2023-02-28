import React, { useEffect, useState,createContext } from 'react';
import { useSelector } from 'react-redux';
import styles from '/public/css/monthPage.module.css';
import MonthCell from './monthPage/MonthCell';
import { RootState } from '../store';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import db from "../firebase/firebase"
import EditTagDialog from './monthPage/EditTagDialog';
import InviteCard from '../components/sideBar/InviteCard';
import FriendInformation from "../components/sideBar/FriendInformation"
import AddFriendCard from '../components/sideBar/AddFriendCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered} from '@fortawesome/free-solid-svg-icons'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'


export const commonData = createContext({
    isTagsArray:undefined,
    setTagsArray:undefined,
    showTagIndex:undefined,
    setShowTagIndex:undefined,
    setShowListDialog:undefined,
    chooseCell:undefined,
    setChooseCell:undefined
})


function MonthPage() {
    const [sideBarStatus,setSideBarStatus] = useState(true)
    const [buttonWord,setButtonWord] = useState("CLOSE")
    const [buttonRight,setButtonRight] = useState('380px')
    const [gridRow,setGridRow] = useState("80% 20%")

    const [friendCard ,setFriendCard] = useState(false)
    const [informationCard,setInformationCard] = useState(false)
    const [friendInformationCard,setFriendInformationCard] = useState(false)
    const [showListDialog,setShowListDialog] = useState(false)
    //const [commonData,setCommonData] = useState([])
    const [isTagsArray, setTagsArray] = useState([]);
    const [chooseCell,setChooseCell] = useState([])
    const [showTagIndex, setShowTagIndex] = useState(0);
    const [chooseEmail,setChooseEmail] = useState("")
    const [friendList,setFriendList] = useState([])
    const [informationList,setInformationList] = useState([])
    const [chooseInformationIndex,setChooseInformationIndex] = useState("")
    const [hiddenSideBarButton,setHiddenSideBarButton] = useState("flex")
    //let x =  db.getToDoListData()

    const handleRWD=()=>{
        if(window.innerWidth>1200){
            setHiddenSideBarButton("flex")
        }
            //setMobile("PC");
        else
            //setMobile("mobile");
            setHiddenSideBarButton("none")
            //console.log(window.innerWidth)
    }

    useEffect(()=>{
        window.addEventListener('resize',handleRWD);
        window.addEventListener('scroll',movePositionY)
        handleRWD();
        return(()=>{
            window.removeEventListener('resize',handleRWD);
            window.removeEventListener('scroll',movePositionY)
        })
    },[]);

    // 監聽滾動事件
    const movePositionY= (element:any) => {
        const THRESHOLD = 20; // 定義滾動閾值為50像素
        const mouseY = element.offsetTop;
        console.log("目前位置,",mouseY)
        const windowHeight = window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (mouseY > windowHeight - THRESHOLD && scrollTop + windowHeight < pageHeight) {
            // 滑鼠在視窗底部以下THRESHOLD像素，且頁面還沒有滾動到底部
            window.scrollBy(0, THRESHOLD); // 滾動頁面
        }
    };

    return (

        <commonData.Provider value={{isTagsArray,
                                    setTagsArray,
                                    setShowTagIndex,
                                    showTagIndex,
                                    setShowListDialog,
                                    chooseCell,
                                    setChooseCell}}>
            <div className={styles.monthPage_background}>
                <NavigationBar
                    setSideBarStatus = {setHiddenSideBarButton}
                />

                {friendCard?(
                    <AddFriendCard  setFriend={setFriendCard} 
                                    setFriendList={setFriendList}/>
                ):null}

                {informationCard?
                (<InviteCard setInformation={setInformationCard}
                             chooseInformationIndex = {chooseInformationIndex}
                             informationList = {informationList}
                             setInformationList = {setInformationList}
                            />
                ):null}

                {friendInformationCard?(<FriendInformation
                                    setFriendInformationCard={setFriendInformationCard}
                                    chooseEmail={chooseEmail}/>
                ):null}

                {showListDialog?(<><EditTagDialog/></>):null}

                <div className={styles.monthPage_container} style={{gridTemplateColumns:`${gridRow}`}}>
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
                        <MonthCell friendData = {friendList}/>
                    </div>
                    <div className={styles.sideBar_container}  style={{display:`${hiddenSideBarButton}`}}>
                        {!sideBarStatus ? (<div className={styles.sideBar_button_container}
                            style={{right:`${buttonRight}`}}
                                onClick={()=>{
                                    if(sideBarStatus){
                                        // setSideBarStatus(false)
                                        // setButtonWord("OPEN")
                                        // setButtonRight("0px")
                                        // setGridRow("99% 1%")
                                    }else{
                                        // setSideBarStatus(true)
                                        // setButtonWord("CLOSE")
                                        // //setButtonRight('380px')
                                        // setGridRow("80% 20%")
                                    }

                                    setSideBarStatus(true)
                                    setGridRow("80% 20%")
                                }}
                        >
                            <div className={styles.sideBar_button}>
                                <FontAwesomeIcon  icon={faChevronLeft} />
                                <FontAwesomeIcon  icon={faBarsStaggered} className={styles.bar_icon}/>
                            </div>
                            <div className={styles.sideBar_button_background}></div>
                        </div>):null}
                        {sideBarStatus?(<SideBar setFriend={setFriendCard}
                        setSideBarStatus = {setSideBarStatus}
                        setGridRow = {setGridRow}
                        setInformation={setInformationCard}
                        setFriendInformationCard={setFriendInformationCard}
                        friendList={friendList}
                        setFriendList = {setFriendList}
                        setChooseEmail = {setChooseEmail}
                        setChooseInformationIndex = {setChooseInformationIndex}
                        setInformationList = {setInformationList}
                        informationList = {informationList}
                        />):null}
                    </div>
                </div>
                
                <Footer/>
            </div>
        </commonData.Provider>
    );
}

export default MonthPage;
