export const LOG_IN = 'lOG_IN';
export const LOG_OUT = 'LOG_OUT';

/*export const changeTime = (nowTime:any) => (
    {
        type:NEXT_MONTH,
        payload:{
            nowTime,
        }
    }
)*/

export const logIn = (name:string,email:string) => ({
    type: LOG_IN,
    payload:{
        name,
        email
    }
});

export const logOut = () => ({
    type: LOG_OUT,
});