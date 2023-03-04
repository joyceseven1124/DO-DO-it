import React, { useEffect, useState, useRef, useContext } from 'react';
import { Provider, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/editTagDialog.module.css';
import { tagData } from './MonthCell';
import { memberStatus } from '../../';
import db from '../../firebase/firebase';
import { commonData } from '../MonthPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import {faAlignLeft} from '@fortawesome/free-solid-svg-icons'
import {faClock} from '@fortawesome/free-solid-svg-icons'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import ErrorCard from '../../components/ErrorCard';

export default function EditTagDialog(props: any) {
    const monthNumber = useSelector(
        (state: RootState) => state.timeControlReducer.monthNumber
    );
    const yearNumber = useSelector(
        (state: RootState) => state.timeControlReducer.year
    );
    const { memberInformation } = useContext(memberStatus);
    const { setShowListDialog } = useContext(commonData);
    const { isTagsArray } = useContext(commonData);
    const { setTagsArray } = useContext(commonData);
    const { showTagIndex } = useContext(commonData);
    const { chooseCell } = useContext(commonData);
    const { setChooseCell } = useContext(commonData);
    const [editContent, setEditContent] = useState(true);
    const [cursorStatus, setCursorStatus] = useState(null);
    const [title, setTitle] = useState(' ');
    const [date, setDate] = useState({});
    const [description, setDescription] = useState('');
    const [titleRow, setTitleRow] = useState(1);
    const [color, setColor] = useState('');
    const [status, setStatus] = useState('未完成');
    const [statusSentence, setStatusSentence] = useState('Unfinished');
    const [buttonWord, setButtonWord] = useState('MARK FINISH');
    const [friend, setFriend] = useState([]);
    const [theme, setTheme] = useState('bubble');
    
    const [errorCardShow,setErrorCardShow] = useState(false)
    const [errorCardWord,setErrorCardWord] = useState("")


    let titleWord: string;
    let dateData: {
        yearStart: number;
        yearEnd: number;
        monthStart: number;
        monthEnd: number;
        dayStart: number;
        dayEnd: number;
        weekStart: string;
        weekEnd: string;
    };
    let descriptionWord: any;
    let colorWord: string;
    let statusWord: string;
    let saveStatus: string = status;
    let databaseFileName: string;
    let friendEmail: string[] =[];
    let sendEmail:string

    const dialogData = isTagsArray.filter((element: any) => {
        if (element.index === showTagIndex) {
            const startDate = `${element.yearStart}/${element.monthStart}/${element.dayStart}`;
            const endDate = `${element.yearEnd}/${element.monthEnd}/${element.dayEnd}`;
            const week = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ];
            const weekStart = new Date(
                element.yearStart,
                element.monthStart-1,
                element.dayStart
            ).getDay();

            const weekEnd = new Date(
                element.yearEnd,
                element.monthEnd-1,
                element.dayEnd
            ).getDay();
            const weekStartWord = week[weekStart];
            const weekEndWord = week[weekEnd];
            let monthNumber = useSelector(
                (state: RootState) => state.timeControlReducer.monthNumber
            );

            dateData = {
                yearStart: element.yearStart,
                yearEnd: element.yearEnd,
                monthStart: element.monthStart,
                monthEnd: element.monthEnd,
                dayStart: element.dayStart,
                dayEnd: element.dayEnd,
                weekStart: weekStartWord,
                weekEnd: weekEndWord,
            };
            titleWord = element.title;
            descriptionWord = element.description;

            colorWord = element.color;
            databaseFileName = `${element.yearStart}Y${monthNumber}M`;
            if (element.status === '未完成') {
                statusWord = 'Unfinished';
            } else {
                statusWord = 'Mission accomplished! ';
            }
            friendEmail = element.receiveEmail
            sendEmail = element.sendEmail
            return element;
        }
    });

    useEffect(() => {
        setDate(dateData);
        setTitle(titleWord);
        setDescription(descriptionWord);
        setColor(colorWord);
        setStatusSentence(statusWord);
        if (statusWord !== 'Unfinished') {
            setButtonWord('Unfinished');
            setStatus('完成');
        }
        if (friendEmail) {
            let emailArray = []
            friendEmail.forEach((element)=>{
                if(element !== memberInformation){
                    emailArray.push(element)
                }
            })

            if(sendEmail !== memberInformation){
                emailArray.push(sendEmail)
            }
            setFriend(emailArray);
        }
    }, []);

    const updateData = () => {
        const dataArray = [...isTagsArray];
        let newDataArray = dataArray.filter((element) => {
            if (element.index !== showTagIndex) {
                return element;
            }
        });
        let time;
        let index;

        dialogData.map((element: any) => {
            element.title = title;
            element.description = description;
            element.color = color;
            element.status = saveStatus;
            time = `${yearNumber}Y${monthNumber}M`;
            index = element.index;
            newDataArray.push(element);
            if (dialogData.length === 1) {
                const result = db.updateData(
                    memberInformation,
                    time,
                    index,
                    element
                );
                result.then((msg) => {
                    if(msg === "fail"){
                        setErrorCardShow(true)
                        setErrorCardWord("save failed")
                    }
                });
                }
            });
            if (dialogData.length > 1) {
                const result = db.updateData(
                    memberInformation,
                    time,
                    index,
                    dialogData
                );
                result.then((msg) => {
                    if(msg === "fail"){
                        setErrorCardShow(true)
                        setErrorCardWord("save failed")
                    }
                });
            }
            setTagsArray(newDataArray);
    };

    const deleteHandle = () => {
        const dataArray = [...isTagsArray];
        const chooseCellArray = [...chooseCell];
        let startCell: number;
        let connectWidth: number;
        let newTagArray = dataArray.filter((element) => {
            if (element.index !== showTagIndex) {
                return element;
            } else {
                if (startCell < element.id) {
                    startCell = element.id;
                    connectWidth = element.connectWidth;
                }
            }
        });
        let endCell = startCell + connectWidth / 100 - 1;
        const newChooseCellArray = chooseCellArray.filter((element) => {
            if (
                element[0] !== startCell &&
                element[element.length - 1] !== endCell
            ) {
                return element;
            }
        });
        setChooseCell(newChooseCellArray);
        setTagsArray(newTagArray);
    };

    return (
        <div className={styles.edit_card_wrapper}>
            {errorCardShow ? <ErrorCard msg={errorCardWord} setCard={setErrorCardShow}/>:null}
            <div className={styles.edit_card_content}>
                <div className={styles.list_information}>
                    <div className={styles.edit_buttons_container}>
                        {editContent ? (
                            <FontAwesomeIcon
                                icon={faPen}
                                className={styles.description_mark_tool}
                                onClick={(e) => {
                                    setEditContent(false);
                                    setCursorStatus('pointer');
                                }}
                            />
                        ) : null}

                        <div className={styles.button_wrapper}>
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className={styles.delete_button}
                                onClick={(e) => {
                                    const result = db.deleteData(
                                        memberInformation,
                                        databaseFileName,
                                        showTagIndex
                                    );
                                    result.then((msg) => {
                                        if (msg === 'success') {
                                            setShowListDialog(false);
                                            deleteHandle();
                                        }else{
                                            setErrorCardShow(true)
                                            setErrorCardWord("save failed")
                                        }
                                    });
                                }}
                            />
                        </div>
                        <FontAwesomeIcon
                            icon={faXmark}
                            className={styles.close_container}
                            onClick={(e) => {
                                setShowListDialog(false);
                            }}
                        />
                    </div>

                    <div className={styles.list_title_content}>
                        <input
                            type="color"
                            style={{
                                backgroundColor: `${color}`,
                                cursor: `${cursorStatus}`,
                                marginLeft:`${!editContent ? "10px" : "0px"}`,
                                border: "1px solid  rgb(161, 161, 161)"
                            }}
                            className={styles.list_color}
                            disabled={editContent}
                            onChange={(e) => {
                                e.target.click();
                                setColor(e.target.value);
                            }}
                        />

                        <textarea
                            className={styles.list_title}
                            cols={20}
                            rows={titleRow}
                            value={`${title}`}
                            readOnly={editContent}
                            disabled={editContent}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (e.target.value.length < 20) {
                                    setTitleRow(1);
                                } else if (e.target.value.length > 20) {
                                    setTitleRow(2);
                                }
                            }}
                        />
                        {editContent ? null : (
                            <div className={styles.decorate_line}></div>
                        )}
                    </div>

                    <div className={styles.list_date}>
                        <FontAwesomeIcon className={styles.time_icon} icon={faClock} />
                        <div className={styles.list_days_wrapper}>
                            <div className={styles.list_one_day_wrapper}>
                                <div className={styles.list_week}>
                                    {dateData.weekStart}
                                </div>
                                <div
                                    className={styles.list_day}
                                >{`${dateData.yearStart}/${dateData.monthStart}/${dateData.dayStart}`}</div>
                            </div>
                            <div>⇀</div>
                            <div className={styles.list_one_day_wrapper}>
                                <div className={styles.list_week}>
                                    {dateData.weekEnd}
                                </div>
                                <div
                                    className={styles.list_day}
                                >{`${dateData.yearEnd}/${dateData.monthEnd}/${dateData.dayEnd}`}</div>
                            </div>
                        </div>
                    </div>

                    {friend.length > 0 ? (
                        <div className={styles.friend_email_container}>
                            <FontAwesomeIcon className={styles.friend_icon} icon={faUsers} />
                            <div className={styles.friend_email_wrapper}>
                                {friend.map((element: string, index) => {
                                    return (
                                        <div
                                            className={styles.friend_email}
                                            key={`tag-friend-${index}`}
                                        >
                                            {element}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : null}

                    <div className={styles.description_content}>
                        {editContent ? (
                            <div className={styles.description_no_edit_content}>
                                {descriptionWord ?
                                    <FontAwesomeIcon icon={faAlignLeft} className={styles.description_icon}/> :
                                    null
                                }
                                
                                <div className={styles.no_edit_description}>{parse(description)}</div>
                            </div>
                        ) : (
                            <div className={styles.description_edit_content}>
                                <ReactQuill
                                    value={description}
                                    readOnly={false}
                                    theme={'snow'}
                                    onChange={(val) => {
                                        setDescription(val);
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {!editContent ? (
                        <div className={styles.save_button_container}>
                            <div
                                className={styles.save_button}
                                onClick={(e) => {
                                    setEditContent(true);
                                    setCursorStatus('default');
                                    updateData();
                                }}
                            >
                                SAVE
                            </div>
                        </div>
                    ) : null}

                    <div className={styles.task_status_wrapper}>
                        <div className={styles.task_sentence_word}>
                            {statusSentence}
                        </div>
                        <div
                            className={styles.finish_button}
                            id={status === '完成' ? 'no_finish_button' : ''}
                            onClick={(e) => {
                                if (status === '未完成') {
                                    saveStatus = '完成';
                                    setStatus('完成');
                                    updateData();
                                    setStatusSentence('Mission accomplished!');
                                    setButtonWord('UNDONE');
                                } else {
                                    saveStatus = '未完成';
                                    setStatus('未完成');
                                    updateData();
                                    setStatusSentence('Unfinished');
                                    setButtonWord('MARK FINISH');
                                }
                            }}
                        >
                            {buttonWord}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
