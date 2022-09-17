export const setAnchorElement = (evt) => {
    return {
        type : "AnchorElementSet", 
        payload : evt.currentTarget
    };
}

export const clearAnchorElement = (evt) => {
    return {
        type : "AnchorElementCleared", 
        payload : null
    };
}
