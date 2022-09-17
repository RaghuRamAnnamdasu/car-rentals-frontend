import { Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminAddCar } from "../Redux/actions/adminCars_action";
import "./adminAddCar.css";


export function AdminAddCar(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [carObject, setCarObject] = useState({bookedTimings : []});
    const {result,error} =  useSelector((state)=>state.adminAddCarReducer);
    const vertical = "top";
    const horizontal = "center";
    const [open, setOpen] = useState(false);

    const handleSelectFuelType = (evt)=>{
        setCarObject({...carObject, fuel: evt.target.value});
    }

    const handleSelectLocation = (evt)=>{
        setCarObject({...carObject, location: evt.target.value});
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(adminAddCar(carObject, navigate, setOpen));
        console.log("carObject :", carObject);
    };

    const handleClose = ()=>{
        setOpen(false);
        navigate("/admin/home")
    }

    return(
        <div className = "addCarWrapper">
            <div className = "addCarHeading">ADD CAR</div>

            <form onSubmit={handleSubmit}>

                {error && <div className = "errorWrapper">{error}</div>}    
                <div>
                    <label htmlFor="carName" className="label">Car Name:</label>
                    <input type="text" className="input" id="carName" placeholder="Enter car name" name="carName" onBlur={(evt) => { carObject.name = evt.target.value }} required />
                </div>
                <div>
                    <label htmlFor="carImage" className="label">Car Image:</label>
                    <input type="text" className="input" id="carImage" placeholder="Enter car image URL" name="carImage" onBlur={(evt) => { carObject.image = evt.target.value   }} required />
                </div>
                <div>
                    <label className = "label" for="carFuelType">Choose Fuel Type:</label>
                    <select className = "fuelTypeSelectTag input" name="carFuelType" id="carFuelType" onChange = {handleSelectFuelType} onBlur={(evt) => { carObject.fuel = evt.target.value }}>
                        <option value="selectFuelTypeOption">--Select Fuel Type--</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="carCapacity" className="label">Seating Capacity:</label>
                    <input type="number" className="input" id="carCapacity" placeholder="Enter seating capacity (number)" name="carCapacity" onBlur={(evt) => { carObject.seatingCapacity = parseInt(evt.target.value) }} required />
                </div>
                <div>
                    <label htmlFor="carCostPerHour" className="label">Cost Per Hour:</label>
                    <input type="number" className="input" id="carCostPerHour" placeholder="Enter cost per hour" name="carCostPerHour" onBlur={(evt) => { carObject.costPerHour = parseInt(evt.target.value) }} required />
                </div>
                <div>
                    <label className = "label" for="location">Choose Car location:</label>
                    <select className = "locationSelectionTag input" name="location" id="location" onChange = {handleSelectLocation} onBlur={(evt) => { carObject.location = evt.target.value }}>
                        <option value="selectFuelTypeOption">--Select Location--</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                    </select>
                </div>
                <Button type="submit" variant = "contained" className="addCarButton">Submit</Button>
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
    );
}