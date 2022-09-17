const initialAvailableCarsState = {
    adminAvailableCarsList :[],
    error : ""
};

const initialAddCarResultState = {
    result :{},
    error : ""
};

const initialEditCarResultState = {
    result :{}
};

export const filterAdminCarsReducer = (state = initialAvailableCarsState, action) => {
    switch(action.type)
    {
        case "adminCarsFiltered": 
            return {
                ...state,
                adminAvailableCarsList : action.payload.adminAvailableCarsList,
                error : action.payload.error
            }

            case "adminDeletedCar": 
            return {
                adminAvailableCarsList : action.payload,
                error : ""
            }

        default: return state;
    }
}


export const adminAddCarReducer = (state = initialAddCarResultState, action) => {
    switch(action.type)
    {
        case "adminAddedCar": 
            return {
                ...state,
                result : action.payload.result,
                error : action.payload.error
            }

        default: return state;
    }
}



export const adminEditCarReducer = (state = initialEditCarResultState, action) => {
    switch(action.type)
    {
        case "adminEditedCar": 
            return {
                ...state,
                result : action.payload.result
            }

        default: return state;
    }
}