const initialMessageState = {
    message : "",
    type : "",
    vertical : "top",
    horizontal : "center"
}

export const rentCarReducer = (state = initialMessageState, action) => {
    switch(action.type)
    {
        case "bookingDataUpload":
            return {
                ...state, 
                message: action.payload.message,
                type : action.payload.type
            }
        
        default: return state;
    }
}