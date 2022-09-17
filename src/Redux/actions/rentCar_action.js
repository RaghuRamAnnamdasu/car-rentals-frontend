import { API } from "../../global";


export const rentCar = (data,setOpen) => {
    return async (dispatch) => {
        try{
            const result = await fetch(`${API}/cars/rentCar`,{
                method : "POST",
                body: JSON.stringify(data),
                headers: {"content-type": "application/json"}
            }).then((data)=>data.json());
            dispatch( {
                type : "bookingDataUpload", 
                payload : result
            });
        }catch(error){
            console.log(error);
        }
    }
}