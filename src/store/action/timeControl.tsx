export const NEXT_MONTH = 'NEXT_MONTH';
export const PREV_MONTH = 'PREV_MONTH';
/*export const changeTime = (nowTime:any) => (
    {
        type:NEXT_MONTH,
        payload:{
            nowTime,
        }
    }
)*/

export const addTime = () => ({
    type: NEXT_MONTH,
});

export const minusTime = () => ({
    type: PREV_MONTH,
});
