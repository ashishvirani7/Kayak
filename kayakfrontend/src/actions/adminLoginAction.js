export const changeValueAdmin=(event) => {
    return(
    {
        type:"CHANGE_VALUE_LOGIN_ADMIN",
        data: event
    }
    );
}


export const loginSuccess=(user) => {
    return(
    {
        type:"LOGIN_SUCCESS",
        data: user
    }
    );
}