const initialSignupState = {
    userName: "",
    email : "",
    password : "",
    emailError : "",
    passwordError : ""
}

export const signupReducer = (state = initialSignupState, action) => {
    switch(action.type)
    {
        case "UserNameEntered": 
            return {
                ...state,
                userName : action.payload
            }
        case "EmailIdEntered":
            return {
                ...state, 
                email: action.payload
            }
        case "PasswordEntered": 
            return {
                ...state, 
                password: action.payload
            }
        case "EmailErrorOccured": 
            return {
                ...state, 
                emailError: action.payload
            }
        case "PasswordErrorOccured": 
            return {
                ...state, 
                passwordError: action.payload
            }

        default: return state;
    }
}
