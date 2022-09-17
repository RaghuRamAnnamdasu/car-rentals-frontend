export const signupUserName = (evt) => {
    return {type : "UserNameEntered", payload : evt.target.value};
}

export const signupEmailId = (evt) => {
    return {type : "EmailIdEntered", payload : evt.target.value};
}

export const signupPassword = (evt) => {
    return {type : "PasswordEntered", payload : evt.target.value};
}


export const signupEmailError = (data) => {
    return {type : "EmailErrorOccured", payload : data};
}

export const signupPasswordError = (data) => {
    return {type : "PasswordErrorOccured", payload : data};
}