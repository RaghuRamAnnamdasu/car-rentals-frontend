const initialMenuState = {
    anchorEl : null
}

export const menuReducer = (state = initialMenuState, action) => {
    switch(action.type)
    {
        case "AnchorElementSet":
            return {
                ...state, 
                anchorEl: action.payload
            }
        case "AnchorElementCleared": 
            return {
                ...state, 
                anchorEl: action.payload
            }
        
        default: return state;
    }
}