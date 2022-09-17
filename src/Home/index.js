import { Button, Card, CardContent, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import InputLabel from '@mui/material/InputLabel';

import MenuItem from '@mui/material/MenuItem';

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadEndTime, loadStartTime } from "../Redux/actions/DateAndTimePicker_action";
import { filterCars } from "../Redux/actions/filterCars_action";
import { getAllCars } from "../Redux/actions/getAllCars_action";
import "./home.css";
import { set } from "date-fns";
import { locationUpdation } from "../Redux/actions/location_action";

export function Home(){

    const navigate = useNavigate();
    const {startDateAndTime, endDateAndTime,startDate, endDate, startTime, endTime} = useSelector((state)=>state.dateAndTimeReducer);
    const { cars } = useSelector((state) => state.carsDataReducer);
    const { availableCarsList,error } = useSelector((state) => state.filterCarsReducer);
    const { location } = useSelector((state) => state.locationReducer);
    console.log("error",error);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCars());
        dispatch(locationUpdation("selectLocationOption"));
        dispatch(loadStartTime(new Date()));
        dispatch(loadEndTime(new Date()));
    },[])

    const handleSearchCars = () => {
        dispatch(filterCars(cars,startDateAndTime,endDateAndTime, navigate,location));
        // console.log("error",error)
    }

    const handleSelectLocation = (evt)=>{
        // console.log("Location Event",evt.target.value);
        dispatch(locationUpdation(evt.target.value));
    }

    return(
        <div className="homeWrapper">
            <h1>We are previllaged to serve you. <br/>Always thrives for your safety and comfort..!!</h1>
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
                    <div className="dateWrapper">
                    <DateAndTimePicker type="startPicker" startDateAndTime={startDateAndTime} endDateAndTime={endDateAndTime}/>
                    <DateAndTimePicker type="endPicker" startDateAndTime={startDateAndTime} endDateAndTime={endDateAndTime}/>
                    </div>
                    <Button className = "handleSearchCars"onClick = {handleSearchCars} variant="contained">Find Cars</Button>
                </CardContent>
            </Card>
        </div>
    );
}


function DateAndTimePicker({type,startDateAndTime,endDateAndTime}){
    const dispatch = useDispatch();

    
    return(
        <div className = "dateAndTimePickerWrapper">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label={type === "startPicker" ? "Start Time" : "End Time"}
                    value={type === "startPicker" ? startDateAndTime : endDateAndTime}
                    disablePast={true}
                    onChange={(newValue) => {
                        type === "startPicker" ? dispatch(loadStartTime(newValue)) : dispatch(loadEndTime(newValue))
                    }}
                />
            </LocalizationProvider>
        </div>
    );
}