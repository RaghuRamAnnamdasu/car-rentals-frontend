import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../Redux/actions/getAllCars_action";
import { Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./availableCars.css";
import { useNavigate } from "react-router-dom";



export function AvailableCars(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { availableCarsList,error } = useSelector((state) => state.filterCarsReducer);

    useEffect(()=>{
        if(!availableCarsList.length) {
            navigate("/");
        }
    },[availableCarsList])
    
    return(
        <div className = "homePage">
            {availableCarsList.map((value,index)=>{
                return(<CarCard carData={value} key={index}/>);
            })}
        </div>
    );
}

function CarCard({carData}){
    const navigate = useNavigate();
    // console.log("carcard",carData);
    return(
        <Card className = "cardWrapper">
            <img className = "carImage" src = {carData.image} alt ={carData.name} />
            <CardContent className = "contentWrapper">
                <div className = "content">
                    <h3 className = "carName">{carData.name}</h3>
                    <div className = "carRent">Rent Per Hour : INR {carData.costPerHour}</div>
                </div>
                <Button variant="outlined" onClick = {()=>navigate(`/rentCar/${carData._id}`)}>Book Now</Button>
            </CardContent>
        </Card>
    );
}