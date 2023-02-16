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
import EditInviteCard from "../components/SideBar/EditInviteCard"
import AddFriendCard from '../components/sideBar/AddFriendCard';

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
    const [editInviteCard,setEditInviteCard] = useState(false)
    const [showListDialog,setShowListDialog] = useState(false)
    //const [commonData,setCommonData] = useState([])
    const [isTagsArray, setTagsArray] = useState([]);
    const [chooseCell,setChooseCell] = useState([])
    const [showTagIndex, setShowTagIndex] = useState(0);
    const [chooseEmail,setChooseEmail] = useState("")
    const [friendList,setFriendList] = useState([])
    //let x =  db.getToDoListData()
    return (
        <commonData.Provider value={{isTagsArray,
                                    setTagsArray,
                                    setShowTagIndex,
                                    showTagIndex,
                                    setShowListDialog,
                                    chooseCell,
                                    setChooseCell}}>
            <div className={styles.monthPage_background}>
                <NavigationBar/>
                {friendCard?(
                    <AddFriendCard  setFriend={setFriendCard} 
                                    setFriendList={setFriendList}/>
                ):null}

                {informationCard?
                (<InviteCard setInformation={setInformationCard}/>
                ):null}

                {editInviteCard?(<EditInviteCard 
                                    setEditInvite={setEditInviteCard}
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
                        <MonthCell/>
                    </div>
                    <div className={styles.sideBar_container}>
                        <div className={styles.sideBar_button}
                            style={{right:`${buttonRight}`}}
                            onClick={()=>{
                                if(sideBarStatus){
                                    setSideBarStatus(false)
                                    setButtonWord("OPEN")
                                    setButtonRight("0px")
                                    setGridRow("100%")
                                }else{
                                    setSideBarStatus(true)
                                    setButtonWord("CLOSE")
                                    setButtonRight('380px')
                                    setGridRow("80% 20%")
                                }
                            }}>{buttonWord}</div>
                        {sideBarStatus?(<SideBar setFriend={setFriendCard}
                        setInformation={setInformationCard}
                        setEditInvite={setEditInviteCard}
                        friendList={friendList}
                        setFriendList = {setFriendList}
                        setChooseEmail = {setChooseEmail}
                        />):null}
                    </div>
                </div>
                <Footer/>
            </div>
        </commonData.Provider>
    );
}

export default MonthPage;
