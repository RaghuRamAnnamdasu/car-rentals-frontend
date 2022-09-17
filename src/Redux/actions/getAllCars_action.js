import { API } from "../../global";

export const getAllCars = () => {
    return async (dispatch) => {
        try{
            const carsData = await fetch(`${API}/cars/getAllCars`).then((data)=>data.json());
            // console.log(carsData);
            dispatch({type : "Cars_Data", payload : carsData});
        }catch(error){
            console.log(error);
        }
    }
}