const initialBookedDetailsState = [];


export const myBookingsReducer = (state=initialBookedDetailsState, action)=>{
    switch(action.type)
    {
        case "myBookedCars": 
            return action.payload;

        default : return state;
    }
}