import React, {
    useEffect,
    useState,
    useRef,
    createContext,
    useContext,
} from 'react';
import { Provider, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import ToDoListDialogBox from './monthCell/ToDoListDialogBox';
import ToDoListTag from './monthCell/ToDoListTag';
import { memberStatus } from '../../';
import { commonData } from '../MonthPage';
import db from '../../firebase/firebase';
import styled from 'styled-components';
import styles from '/public/css/monthPage.module.css';
import dayjs from 'dayjs';
import toObject from 'dayjs/plugin/toObject';
import weekday from 'dayjs/plugin/weekday';
import findMaxDay from '../../components/commonFunction/findMaxDay';
import ErrorCard from '../../components/ErrorCard';
import makeChooseCellArray from './utilityFunction/makeChooseCellArray';
import Cell from './monthCell/Cell';
dayjs.extend(toObject);
dayjs.extend(weekday);

export const tagData = createContext({
    tagStartCell: undefined,
    tagEndCell: undefined,
    setTagStartCell: undefined,
    setTagEndCell: undefined,
    dayStart: undefined,
    setDayStart: undefined,
    dayEnd: undefined,
    setDayEnd: undefined,
    startDayInit: undefined,
    endDayInit: undefined,
});

export default function MonthCell(props: any) {
    const [dayStart, setDayStart] = useState(0);
    const [dayEnd, setDayEnd] = useState(0);
    const [tagStartCell, setTagStartCell] = useState(0);
    const [tagEndCell, setTagEndCell] = useState(0);
    const [showCardDisplay, setShowCardDisplay] = useState(false);
    const [monthCellHeight, setMonthCellHeight] = useState(700);
    const [maxOrderNumberResult ,setMaxOrderNumberResult] = useState(0)
    const [errorCardShow, setErrorCardShow] = useState(false);
    const [errorCardWord, setErrorCardWord] = useState('');
    const startDayInit = useRef(0);
    const endDayInit = useRef(0);
    const { memberInformation } = useContext(memberStatus);
    const { setTagsArray } = useContext(commonData);
    const { isTagsArray } = useContext(commonData);
    const { chooseCell } = useContext(commonData);
    const { setChooseCell } = useContext(commonData);

    const searchMonth = useSelector(
        (state: RootState) => state.timeControlReducer.searchMonth
    );
    const monthNumber = useSelector(
        (state: RootState) => state.timeControlReducer.monthNumber
    );
    const yearNumber = useSelector(
        (state: RootState) => state.timeControlReducer.year
    );
    useEffect(() => {
        if (maxOrderNumberResult > 2) {
            const height = 300 * maxOrderNumberResult;
            if (height > monthCellHeight && maxOrderNumberResult >= 3) {
                setMonthCellHeight(height);
            }else{
                setMonthCellHeight(height)
            }
        }else{
            setMonthCellHeight(700)
        }
    }, [maxOrderNumberResult]);

    useEffect(() => {
        setTagsArray([]);
        setMonthCellHeight(700);
        setChooseCell([]);
        if (memberInformation !== '') {
            const searchDataTime = `${yearNumber}Y${monthNumber}M`;
            let monthData = db.getToDoListData(
                memberInformation,
                searchDataTime
            );
            let data: any = [];
            let chooseCellData: any = [];
            monthData.then((msg) => {
                props.setLoading(false);
                if (msg !== 'fail' && msg !== null) {
                    let moreRowsTag = msg.filter((element: any) => {
                        if (element.length > 1) {
                            return element;
                        }
                        data.push(element);
                        const startId = element.id;
                        const endId = startId + element.connectWidth / 100 - 1;
                        const result = makeChooseCellArray(
                            startId,
                            endId,
                            'change',
                            chooseCell
                        );
                        chooseCellData.push(result[0]);
                    });
                    moreRowsTag.map((element: any, index: number) => {
                        if (element[0]) {
                            data.push(element[0]);
                            const startId = element[0].id;
                            const endId =
                                startId + element[0].connectWidth / 100 - 1;
                            const result = makeChooseCellArray(
                                startId,
                                endId,
                                'change',
                                chooseCell
                            );
                            chooseCellData.push(result[0]);
                        }
                        if (element[1]) {
                            data.push(element[1]);
                        }

                        if (element[2]) {
                            data.push(element[2]);
                        }

                        if (element[3]) {
                            data.push(element[3]);
                        }

                        if (element[4]) {
                            data.push(element[4]);
                        }
                        if (element[5]) {
                            data.push(element[5]);
                        }
                    });
                    setChooseCell(chooseCellData);
                    setTagsArray(data);
                }
            });
        } else {
            setChooseCell([]);
        }
    }, [searchMonth, memberInformation]);

    return (
        <tagData.Provider
            value={{
                setTagEndCell,
                setTagStartCell,
                tagStartCell,
                tagEndCell,
                dayStart,
                setDayStart,
                dayEnd,
                setDayEnd,
                startDayInit,
                endDayInit,
            }}
        >
            <div
                className={styles.monthCell}
                style={{ height: `${monthCellHeight}px` }}
            >
                <Cell
                    setErrorCardShow={setErrorCardShow}
                    setErrorCardWord={setErrorCardWord}
                    setShowCardDisplay={setShowCardDisplay}
                    monthCellHeight={monthCellHeight}
                    setMaxOrderNumberResult={setMaxOrderNumberResult}
                    maxOrderNumberResult={maxOrderNumberResult}
                />
            </div>
            {errorCardShow ? (
                <ErrorCard msg={errorCardWord} setCard={setErrorCardShow} />
            ) : null}
            {showCardDisplay ? (
                <>
                    <ToDoListDialogBox
                        status={showCardDisplay}
                        setCardStatus={setShowCardDisplay}
                        friendData={props.friendData}
                        setErrorCardShow={setErrorCardShow}
                        msg={setErrorCardWord}
                    />
                </>
            ) : null}
        </tagData.Provider>
    );
}
