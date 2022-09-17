import { API } from "../../global";


export const getCarById = (id) => {
    return async (dispatch) => {
        try{
            const carDetails = await fetch(`${API}/cars/getCarById/${id}`).then((data)=>data.json());
            // console.log("action",id, carDetails);
            dispatch( {
                type : "Car_Details", 
                payload : carDetails
            });
        }catch(error){
            console.log(error);
        }
    }
}
