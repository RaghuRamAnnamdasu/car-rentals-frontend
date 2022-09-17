const initialState = {carDetails: {}};


export const carDetailsByIdReducer = (state=initialState, action)=>{
    switch(action.type)
    {
        case "Car_Details": 
            return {
                carDetails: action.payload
            };

        default : return state;
    }
}