export const NEXT_MONTH = 'NEXT_MONTH';
export const PREV_MONTH = 'PREV_MONTH';

export const addTime = () => ({
    type: NEXT_MONTH,
});

export const minusTime = () => ({
    type: PREV_MONTH,
});
