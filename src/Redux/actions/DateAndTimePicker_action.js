export const loadStartTime = (value) => {
    return {
        type : "startTime", 
        payload : value
    };
}

export const loadEndTime = (value) => {
    return {
        type : "endTime", 
        payload : value
    };
}
