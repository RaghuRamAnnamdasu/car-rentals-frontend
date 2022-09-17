const initialLocationState = {
    location : "selectLocationOption"
};

export const locationReducer = (state = initialLocationState, action) => {
    switch(action.type)
    {
        case "locationUpdated": 
            return {
                location : action.payload
            }
            
        default: return state;
    }
}
