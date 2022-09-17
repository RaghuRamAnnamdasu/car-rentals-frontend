const initialLoginState = {
    email : "",
    password : "",
    invalidErrorMessage: ""
}


export const loginReducer = (state = initialLoginState, action) => {
    switch(action.type)
    {
        case "EmailId":
            return {
                ...state, 
                email: action.payload
            }
        case "Password": 
            return {
                ...state, 
                password: action.payload
            }
        case "ErrorMessage": 
        return {
            ...state, 
            invalidErrorMessage: action.payload
        }


        default: return state;
    }
}
