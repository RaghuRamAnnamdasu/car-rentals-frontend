const inititalState = {cars: []};


export const carsDataReducer = (state=inititalState, action)=>{
    switch(action.type)
    {
        case "Cars_Data" : return {
            ...state, cars : action.payload
        }

        default : return state;
    }
}