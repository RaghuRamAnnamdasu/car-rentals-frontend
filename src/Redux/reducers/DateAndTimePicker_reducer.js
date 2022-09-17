const initialDateAndTimeState = {
    startDateAndTime : new Date(),
    endDateAndTime : new Date(),
    startDate : new Date().getDate(),
    endDate : new Date().getDate(),
    startTime : `${new Date().getHours()}:${new Date().getMinutes()}`,
    endTime : `${new Date().getHours()}:${new Date().getMinutes()}`
}

export const dateAndTimeReducer = (state = initialDateAndTimeState, action) => {
    // console.log("dateState", state.startDateAndTime)
    switch(action.type)
    {
        case "startTime":
            return {
                ...state, 
                startDateAndTime : action.payload,
                startDate : action.payload.toDateString(),
                startTime : `${action.payload.getHours()}:${action.payload.getMinutes()}`
            }
        case "endTime": 
            return {
                ...state, 
                endDateAndTime : action.payload,
                endDate : action.payload.toDateString(),
                endTime : `${action.payload.getHours()}:${action.payload.getMinutes()}`
            }
        
        default: return state;
    }
}