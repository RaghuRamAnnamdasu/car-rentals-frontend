
export const filterCars = (carsLit,requestedStartDateAndTime,requestedEndDateAndTime, navigate,location) => {
    let availableCarsList=[];
    let error = "";
    let isCarAvailable = false;
    let startTimeMargin = new Date(new Date().getTime()+(3*60*60*1000))
    
    if(location==="selectLocationOption"){
        error = "Please select your location"
    }else if(requestedEndDateAndTime<requestedStartDateAndTime){
        error = "End date & time shall be after start date & time";
    } else if(requestedStartDateAndTime < startTimeMargin){
        error = "Start time shall be atleast 3 hours from current time";
    }else{
        carsLit.map((car)=>{
            if(car.location.toUpperCase() === location.toUpperCase()){
                if(!car.bookedTimings.length){
                    isCarAvailable = true;
                }else{
                    for(var slot of car.bookedTimings){
                        if((requestedStartDateAndTime <= new Date(slot.startTime) && requestedEndDateAndTime < new Date(slot.startTime)) || (requestedStartDateAndTime > new Date(slot.endTime) && requestedEndDateAndTime > new Date(slot.endTime))){
                            isCarAvailable = true;
                        }else{
                            isCarAvailable=false;
                            break;
                        }
                    } 
                }
            }else{
                isCarAvailable=false;
            }
            if(isCarAvailable){
                availableCarsList.push(car); 
            }  
        })
    }

    console.log("availableCarsLit in action", availableCarsList);
    error.length===0 && navigate("/availableCars");
    return {type : "carsFiltered", payload : {availableCarsList, error}};
}