const initialAvailableCarsState = {
    availableCarsList :[],
    error : ""
};

export const filterCarsReducer = (state = initialAvailableCarsState, action) => {
    switch(action.type)
    {
        case "carsFiltered": 
            return {
                ...state,
                availableCarsList : action.payload.availableCarsList,
                error : action.payload.error
            }

        default: return state;
    }
}
