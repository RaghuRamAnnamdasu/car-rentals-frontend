import { API } from "../../global";

export const getBookedCars = (userId) => {
    return async (dispatch) => {
        try{
            const bookedCars = await fetch(`${API}/cars/${userId}/getBookedCars`).then((data)=>data.json());
            // console.log(bookedCars);
            dispatch({type : "myBookedCars", payload : bookedCars});
        }catch(error){
            console.log(error);
        }
    }
}