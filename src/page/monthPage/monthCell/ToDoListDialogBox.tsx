import React, { useEffect, useState, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/index';
import ReactDOM from 'react-dom/client';
import styles from '/public/css/toDoListDialogBox.module.css';
import TimeInformation from '../toDoListDialog/TimeInformation';
import ColorSelector from '../toDoListDialog/ColorSelector';
import { tagData } from '../MonthCell';
import { memberStatus } from '../../..';
import db from '../../../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import { commonData } from '../../MonthPage';
import DescriptionQuillEditor from '../toDoListDialog/DescriptionQuillEditor';
import AddGuest from '../toDoListDialog/AddGuest';



export default function ToDoListDialogBox(props: any) {
    const { memberNowStatus } = useContext(memberStatus);
    const { memberInformation } = useContext(memberStatus);
    const { memberName } = useContext(memberStatus);
    const { tagStartCell } = useContext(tagData);
    const { tagEndCell } = useContext(tagData);
    const { setTagsArray } = useContext(commonData);
    const { isTagsArray } = useContext(commonData);
    const { setChooseCell } = useContext(commonData);
    const { chooseCell } = useContext(commonData);
    const [showRemind, setShowRemind] = useState('none');

    let monthNumber = useSelector(
        (state: RootState) => state.timeControlReducer.monthNumber
    );

    const closedDialog = (e: any) => {
        props.setCardStatus(false);
        setShowRemind('none');
        let newData = [...isTagsArray];
        let newChooseCell = [...chooseCell];
        const cleanTags = Math.abs(startRow - endRow) + 1;
        for (let i = 0; i < cleanTags; i++) {
            newData.pop();
            newChooseCell.pop();
        }
        setTagsArray(newData);
        setChooseCell(newChooseCell);
    };

    const saveData = (e: any) => {
        let time = `${toDoListData.yearStart}Y${monthNumber}M`;
        if (toDoListData.title === '') {
            setShowRemind('block');
            return;
        }
        if (memberNowStatus) {
            let newData = [...isTagsArray];

            const cleanTags = Math.abs(startRow - endRow) + 1;
            for (let i = 0; i < cleanTags; i++) {
                newData.pop();
            }
            if (tagIdWidthArray.length > 1) {
                let sendData: any = [];
                let uuidDate = new Date().getTime().toString();
                tagIdWidthArray.forEach((element) => {
                    let moreRowsListData = {
                        title: toDoListData.title,
                        color: toDoListData.color,
                        yearStart: toDoListData.yearStart,
                        yearEnd: toDoListData.yearEnd,
                        monthStart: toDoListData.monthStart,
                        monthEnd: toDoListData.monthEnd,
                        dayStart: toDoListData.dayStart,
                        dayEnd: toDoListData.dayEnd,
                        description: toDoListData.description,
                        status: toDoListData.status,
                        index: uuidDate,
                        id: element[0],
                        connectWidth: toDoListData.connectWidth,
                        width: element[1],
                        receiveEmail: toDoListData.receiveEmail,
                        sendEmail: memberInformation,
                        sendEmailName: memberName,
                    };
                    newData.push(moreRowsListData);
                    sendData.push(moreRowsListData);
                });
                const result = db.saveToDoList(time, sendData, uuidDate);
                result.then((msg) => {
                    if (msg === 'success') {
                        setTagsArray(newData);
                        props.setCardStatus(false);
                    }else{
                        props.setErrorCardShow("fail")
                        props.msg("Save failed")
                    }
                });
            } else if (tagIdWidthArray.length === 1) {
                const result = db.saveToDoList(time, toDoListData, uuidDate);
                result.then((msg) => {
                    if (msg === 'success') {
                        newData.push(toDoListData);
                        setTagsArray(newData);
                        props.setCardStatus(false);
                    }else{
                        props.setErrorCardShow("fail")
                        props.msg("Save failed")
                    }
                });
            }
        }
    };

    let uuidDate = new Date().getTime().toString();
    let toDoListData = {
        title: '',
        color: '#f6be21',
        yearStart: '',
        yearEnd: '',
        monthStart: '',
        monthEnd: '',
        dayStart: '',
        dayEnd: '',
        description: '',
        status: '未完成',
        index: uuidDate,
        id: 0,
        connectWidth: 0,
        width: 0,
        receiveEmail: [] as string[],
        sendEmail: `${memberInformation}`,
        sendEmailName: `${memberName}`,
    };

    let tagArray = [...isTagsArray];
    const perRowStartNumber = [1, 8, 15, 22, 29, 36];
    let startRow = Math.ceil(tagStartCell / 7);
    let endRow = Math.ceil(tagEndCell / 7);
    let width: number;
    let connectWidth: number = (Math.abs(tagStartCell - tagEndCell) + 1) * 100;
    let tagId: number;
    type Tuple = [number, number];
    let tagIdWidthArray: Tuple[] = [];
    let title: string = '';
    let description: string = '';
    toDoListData.connectWidth = connectWidth;

    if (startRow < endRow) {
        for (let i = startRow; i <= endRow; i++) {
            if (i === startRow) {
                tagId = tagStartCell;
                width = (Math.abs(tagStartCell - startRow * 7) + 1) * 100;
            } else if (i === endRow) {
                tagId = perRowStartNumber[i - 1];
                width = (Math.abs(tagEndCell - (endRow * 7 - 6)) + 1) * 100;
            } else {
                tagId = perRowStartNumber[i - 1];
                width = 700;
            }
            
            tagIdWidthArray.push([tagId, width]);
            const tagItem = {
                id: tagId,
                width: width,
                title: title,
                description: description,
                connectWidth: connectWidth,
                color: toDoListData.color,
            };
            tagArray.push(tagItem);
        }
    } else if (startRow > endRow) {
        for (let i = endRow; i <= startRow; i++) {
            if (i === startRow) {
                tagId = perRowStartNumber[i - 1];
                width = (Math.abs(tagStartCell - i * 7 + 6) + 1) * 100;
            } else if (i === endRow) {
                tagId = tagEndCell;
                width = (Math.abs(tagEndCell - endRow * 7) + 1) * 100;
            } else {
                tagId = perRowStartNumber[i - 1];
                width = 700;
            }
            tagIdWidthArray.push([tagId, width]);
            const tagItem = {
                id: tagId,
                width: width,
                title: title,
                description: description,
                connectWidth: connectWidth,
                color: toDoListData.color,
            };
            tagArray.push(tagItem);
        }
    } else {
        if (tagStartCell > tagEndCell) {
            tagId = tagEndCell;
        } else {
            tagId = tagStartCell;
        }

        width = (Math.abs(tagStartCell - tagEndCell) + 1) * 100;
        tagIdWidthArray.push([tagId, width]);
        toDoListData.id = tagId;
        const tagItem = {
            id: tagId,
            width: width,
            title: title,
            description: description,
            connectWidth: connectWidth,
            color: toDoListData.color,
        };
        tagArray.push(tagItem);
    }
    toDoListData.width = width;
    useEffect(() => {
        if (props.status === true) {
            setTagsArray(tagArray);
        }
    }, [props.status]);

    return (
        <div
            id="toDoListDialogBox"
            className={styles.toDoListDialogBox_background}
        >
            <div className={styles.toDoListDialogBox_container}>
                <div className={styles.toDoListDialogBox}>
                    <div>
                        <div className={styles.close_container}>
                            <div
                                className={styles.close_button}
                                onClick={closedDialog}
                            >
                                關
                            </div>
                        </div>
                        <div className={styles.title_container}>
                            <input
                                autoFocus={true}
                                id="toDoListTitle"
                                className={styles.toDoList_title}
                                type="text"
                                placeholder="Add title"
                                onChange={(e) => {
                                    if (e.target.value !== '') {
                                        toDoListData.title = e.target.value;
                                        setShowRemind('none');
                                    } else {
                                        setShowRemind('block');
                                    }
                                }}
                            />
                            <div className={styles.under_line}></div>
                            <div
                                className={styles.remind_word}
                                style={{ display: showRemind }}
                            >
                                Please fill in the title
                            </div>
                        </div>
                        <ColorSelector data={toDoListData} />
                        <TimeInformation
                            data={toDoListData}
                        />
                        <AddGuest
                            friendData={props.friendData}
                            data={toDoListData}
                        />
                        <DescriptionQuillEditor
                            className={styles.description}
                            data={toDoListData}
                        />
                        <div className={styles.save_button_container}>
                            <div
                                className={styles.save_button}
                                onClick={saveData}
                            >
                                SAVE
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
