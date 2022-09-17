import "./adminHome.css";
import { Button, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterCars } from "../Redux/actions/filterCars_action";
import { getAllCars } from "../Redux/actions/getAllCars_action";
import { locationUpdation } from "../Redux/actions/location_action";
import { adminFilterdCars } from "../Redux/actions/adminCars_action";

export function AdminHome(){
    const navigate = useNavigate();
    const { cars } = useSelector((state) => state.carsDataReducer);
    const { location } = useSelector((state) => state.locationReducer);
    const { availableCarsList,error } = useSelector((state) => state.filterAdminCarsReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCars());
        dispatch(locationUpdation("selectLocationOption"));
    },[])

    const handleSelectLocation = (evt)=>{
        dispatch(locationUpdation(evt.target.value));
    }

    const handleSearchCars = () => {
        dispatch(adminFilterdCars(cars,navigate,location));
    }

    
    console.log("error",error);
    return(
        <div className = "adminHomeWrapper">
            <Card className = "carSearchWrapper">
                <CardContent className="carSearchWrapperContent">
                    {error && <div className = "errorWrapper">{error}</div>}
                    <div className = "locationSelectorWrapper">
                        <label className = "locationLabel" for="location">Choose your location:</label>
                        <select className = "locationSelectTag" name="location" id="location" onChange = {handleSelectLocation}>
                            <option value="selectLocationOption">--Select Location--</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="chennai">Chennai</option>
                            <option value="hyderabad">Hyderabad</option>
                        </select>
                    </div>
                    <Button className = "handleSearchCars"onClick = {handleSearchCars} variant="contained">Find Cars</Button>
                </CardContent>
            </Card>
        </div>
    );
}