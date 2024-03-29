import React, { useEffect, useState,createContext,useContext } from 'react';
import styles from '/public/css/monthPage.module.css';
import MonthCell from './monthPage/MonthCell';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import EditTagDialog from './monthPage/EditTagDialog';
import InviteCard from '../components/sideBar/InviteCard';
import FriendInformation from "../components/sideBar/FriendInformation"
import AddFriendCard from '../components/sideBar/AddFriendCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered} from '@fortawesome/free-solid-svg-icons'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {memberStatus} from "../index"



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
    const { memberInformation } = useContext(memberStatus);

    const [sideBarStatus,setSideBarStatus] = useState(true)
    const [buttonRight,setButtonRight] = useState('380px')
    const [gridRow,setGridRow] = useState("85% 15%")

    const [friendCard ,setFriendCard] = useState(false)
    const [informationCard,setInformationCard] = useState(false)
    const [friendInformationCard,setFriendInformationCard] = useState(false)
    const [showListDialog,setShowListDialog] = useState(false)
    const [isTagsArray, setTagsArray] = useState([]);
    const [chooseCell,setChooseCell] = useState([])
    const [showTagIndex, setShowTagIndex] = useState(0);
    const [chooseEmail,setChooseEmail] = useState("")
    const [friendList,setFriendList] = useState([])
    const [friendListIndex,setFriendListIndex] = useState({})
    const [informationList,setInformationList] = useState([])
    const [chooseInformationIndex,setChooseInformationIndex] = useState(0)
    const [hiddenSideBarButton,setHiddenSideBarButton] = useState("flex")

    const [loading,setLoading] = useState(true)

    const handleRWD=()=>{
        if(window.innerWidth>1200){
            setHiddenSideBarButton("flex")
            setSideBarStatus(true)
            setGridRow("85% 15%")
        }
        else
            setHiddenSideBarButton("none")
    }

    useEffect(()=>{
        window.addEventListener('resize',handleRWD);
        handleRWD();
        if(memberInformation){
            setLoading(false)
        }
        return(()=>{
            window.removeEventListener('resize',handleRWD);
        })
    },[]);

    



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
                        setHiddenSideBarButton = {setHiddenSideBarButton}
                        setSideBarStatus = {setSideBarStatus}
                        sideBarStatus = {sideBarStatus}
                    />

                    {friendCard?(
                        <AddFriendCard  setFriend={setFriendCard} 
                                        setFriendList={setFriendList}
                                        friendList={friendList}
                                        friendListIndex = {friendListIndex}
                                        setFriendListIndex = {setFriendListIndex}/>
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

                    {showListDialog?(<><EditTagDialog /></>):null}


                    {memberInformation  ? <div className={styles.monthPage_container} style={{gridTemplateColumns:`${gridRow}`}}>
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
                            <MonthCell  friendData = {friendList} 
                                        setLoading={setLoading} />
                        </div>
                        <div className={styles.sideBar_container}  style={{display:`${hiddenSideBarButton}`}}>
                            {!sideBarStatus ? (<div className={styles.sideBar_button_container}
                                style={{right:`${buttonRight}`}}
                                    onClick={()=>{
                                        setSideBarStatus(true)
                                        setGridRow("85% 15%")
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
                                friendListIndex = {friendListIndex}
                                setFriendListIndex = {setFriendListIndex}
                            />):null}
                            </div>
                        </div> : (<div  className={styles.loading_bg}>
                                    <div className={styles.loading_bg_pic}></div>
                                </div>)}
                    {loading ? (
                            <div  className={styles.loading_bg}>
                                <div className={styles.loading_bg_pic}></div>
                            </div>
                        ):null
                    }
                    <Footer/>
                </div>
            </commonData.Provider>
    );
}

export default MonthPage;
