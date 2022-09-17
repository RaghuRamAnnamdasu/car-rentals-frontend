import { Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { adminEditCar, updateCarDetails } from "../Redux/actions/adminCars_action";
import { getCarById } from "../Redux/actions/getCarDetails_action";
import "../AdminAddCar/adminAddCar.css";

export function AdminEditCar(){

    const {carId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const {result} =  useSelector((state)=>state.adminEditCarReducer);
    const vertical = "top";
    const horizontal = "center";
    useEffect(()=>{
        dispatch(getCarById(carId));
    },[]);
    const {carDetails} = useSelector((state)=>state.carDetailsByIdReducer);
    
    const handleChange = (evt, key) => {
        dispatch(updateCarDetails(carDetails, evt.target.value, key));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(adminEditCar(carDetails, setOpen));
        console.log("carObject :", carDetails);
        evt.target.reset();
    };

    const handleClose = ()=>{
        setOpen(false);
        navigate("/admin/home");
    }
    
    

    return(
        <div className = "editCarWrapper">
            <div className = "editCarHeading">EDIT CAR</div>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="carName" className="label">Car Name:</label>
                    <input type="text" className="input" id="carName" placeholder="Enter car name" name="carName" value = {carDetails.name} onChange={(evt) => handleChange(evt, "name")} required />
                </div>
                <div>
                    <label htmlFor="carImage" className="label">Car Image:</label>
                    <input type="text" className="input" id="carImage" placeholder="Enter car image URL" name="carImage" value = {carDetails.image} onChange={(evt) => handleChange(evt, "image")} required />
                </div>
                <div>
                    <label className = "label" for="carFuelType">Choose Fuel Type:</label>
                    <select className = "fuelTypeSelectTag input" name="carFuelType" id="carFuelType" onChange = {(evt) => handleChange(evt, "fuel")}>
                        <option value="selectFuelTypeOption">--Select Fuel Type--</option>
                        <option value="Petrol" selected = {carDetails.fuel === "Petrol"}>Petrol</option>
                        <option value="Diesel" selected = {carDetails.fuel === "Diesel"}>Diesel</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="carCapacity" className="label">Seating Capacity:</label>
                    <input type="number" className="input" id="carCapacity" placeholder="Enter seating capacity (number)" name="carCapacity" value = {carDetails.seatingCapacity} onChange={(evt) => handleChange(evt, "seatingCapacity")} required />
                </div>
                <div>
                    <label htmlFor="carCostPerHour" className="label">Cost Per Hour:</label>
                    <input type="number" className="input" id="carCostPerHour" placeholder="Enter cost per hour" name="carCostPerHour" value = {carDetails.costPerHour} onChange={(evt) => handleChange(evt, "costPerHour")} required />
                </div>
                <div>
                    <label className = "label" for="location">Choose Car location:</label>
                    <select className = "locationSelectionTag input" name="location" id="location" onChange = {(evt) => handleChange(evt, "location")}>
                        <option value="selectFuelTypeOption">--Select Location--</option>
                        <option value="Chennai" selected = {carDetails.location === "Chennai"}>Chennai</option>
                        <option value="Bangalore" selected = {carDetails.location === "Bangalore"}>Bangalore</option>
                        <option value="Hyderabad" selected = {carDetails.location === "Hyderabad"}>Hyderabad</option>
                    </select>
                </div>
                <Button type="submit" variant = "contained" className="editCarButton">Save Changes</Button>
            </form>
            <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message={result.message}
                        key={vertical + horizontal}
                    />
        </div>
    )
}