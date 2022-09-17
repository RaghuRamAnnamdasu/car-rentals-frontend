import { useNavigate } from "react-router-dom";
import { API } from "../../global";

export const adminFilterdCars = (carsLit,navigate,location) => {
    let adminAvailableCarsList=[];
    let error = "";
    
    if(location==="selectLocationOption"){
        error = "Please select your location"
    }else{
        carsLit.map((car)=>{
            if(car.location.toUpperCase() === location.toUpperCase()){
                adminAvailableCarsList.push(car); 
            }  
        })
    }

    console.log("admin availableCarsLit in action", adminAvailableCarsList);
    error.length===0 && navigate(`/admin/cars/${location}`);
    return {type : "adminCarsFiltered", payload : {adminAvailableCarsList, error}};
}




export const adminAddCar = (carObject,navigate,setOpen) => {
    return async (dispatch) =>{
        let error = "";
        let result = {};
    
        if(carObject.location==="selectFuelTypeOption" || !carObject.location){
            error = "Please select your location"
        }else if(carObject.fuel==="selectFuelTypeOption" || !carObject.fuel){
            error = "Please select fuel type"
        }else{
            try{
                error = "";
                result = await fetch(`${API}/cars/admin/addCar`,{
                    method : "POST",
                    body: JSON.stringify(carObject),
                    headers: {"content-type": "application/json"}
                }).then((data)=>data.json());
            }catch(error){
                console.log(error);
            }  
        }
        dispatch( {
            type : "adminAddedCar", 
            payload : {result,error}
        });
        error.length===0 && setOpen(true);
    }
}



export const adminEditCar = (carObject,setOpen) => {
    return async (dispatch) =>{
        let result = {};
    
            try{
                result = await fetch(`${API}/cars/admin/editCar/${carObject._id}`,{
                    method : "PUT",
                    body: JSON.stringify(carObject),
                    headers: {"content-type": "application/json"}
                }).then((data)=>data.json());
            }catch(error){
                console.log(error);
            }  
        dispatch( {
            type : "adminEditedCar", 
            payload : {result}
        });
        setOpen(true);
    }
}


export const updateCarDetails = (carDetails, value, key) => {
    return {
        type : "adminUpdatedCarDetails", 
        payload : {...carDetails, [key]: value}
    };
}


export const deleteCar = (carId, adminAvailableCarsList) => {
    return async (dispatch) =>{
        try{
            const result = await fetch(`${API}/cars/admin/deleteCar/${carId}`,{
                method : "PUT",
                    body: JSON.stringify({"carId" : carId}),
                headers: {"content-type": "application/json"}
            }).then((data)=>data.json());

            const modifiedCarsList = adminAvailableCarsList.filter((car)=>car._id !== carId);
            dispatch(
                {
                    type : "adminDeletedCar",
                    payload : modifiedCarsList
                }
            );
        }catch(error){
            console.log(error);
        }  
    }
}