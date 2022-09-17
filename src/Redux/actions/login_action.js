export const loginEmailId = (evt) => {
    return {
        type : "EmailId", 
        payload : evt.target.value
    };
}

export const loginPassword = (evt) => {
    return {
        type : "Password", 
        payload : evt.target.value
    };
}

export const loginErrorMessage = (data) => {
    return {
        type : "ErrorMessage", 
        payload : data
    };
}