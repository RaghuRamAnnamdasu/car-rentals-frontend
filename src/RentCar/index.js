import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getCarById } from "../Redux/actions/getCarDetails_action";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { loadEndTime, loadStartTime } from "../Redux/actions/DateAndTimePicker_action";
import { Button, Checkbox, Snackbar } from "@mui/material";
import { rentCar } from "../Redux/actions/rentCar_action";
import StripeCheckout from 'react-stripe-checkout';

import "./rentCar.css";



export function RentCar(){

    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch();
    const { location } = useSelector((state) => state.locationReducer);
    const {carDetails} = useSelector((state)=>state.carDetailsByIdReducer);
    const {message,type,vertical,horizontal} = useSelector((state)=>state.rentCarReducer);
    const {startDateAndTime, endDateAndTime,startDate, endDate, startTime, endTime} = useSelector((state)=>state.dateAndTimeReducer);
    const totalHours = Math.ceil((endDateAndTime-startDateAndTime)/(1000*60*60));
    const hoursCost = totalHours * carDetails.costPerHour;
    let totalPrice = hoursCost;
    const [open, setOpen] = useState(false);
    console.log("total hours", totalHours, "hours cost", hoursCost, "total price", totalPrice);

    const [check, setCheck] = useState(false);
    const [totalCost, setTotalCost] = useState(hoursCost);
    const currentDateTime = new Date();
    useEffect(()=>{
        dispatch(getCarById(id));
    },[]);

    useEffect(()=>{
        if(new Date(startDateAndTime) <= currentDateTime) {
            navigate("/");
        }
    },[startDateAndTime]);

    useEffect(() => {
        check ? setTotalCost(hoursCost+2000) : setTotalCost(hoursCost) ;
    }, [hoursCost, check]);

    const handleChange = (event) => {
        setCheck(!check);
    };


    let userDetails = localStorage.getItem("user");
    userDetails = userDetails && JSON.parse(userDetails);
    const userId = userDetails.userId;


    const onToken = (token)=>{
        // console.log("token",token);
        const bookingData = {
            userId : userId,
            carId : carDetails._id,
            carName : carDetails.name,
            carURL : carDetails.image,
            costPerHour : carDetails.costPerHour,
            totalHours : totalHours,
            totalAmount : totalCost,
            driverRequired : check,
            dateOfBooking : new Date(),
            location : location,
            bookedTimeSlots : {
                startTime : startDateAndTime,
                endTime : endDateAndTime
            },
            token : token
       } 
       dispatch(rentCar(bookingData,setOpen));
       setOpen(true);
    }

    const handleClose = ()=>{
        setOpen(false);
        navigate("/myBookings");
    }

    // const carDetails = carDetailstate.carDetails;
    // dispatch(getCarById(id));
    // console.log("+++++++", id,carDetails,carDetails.name);

    return(
        <div className = "rentalCarWrapper">     
            <div>
            <div className="bookingDetailsWrapper">
                <div className = "imageWrapper">
                    <h3 className = "carName">{carDetails.name}</h3>
                    <img src ={carDetails.image} alt={carDetails.name} />
                </div>
                <div className="bookingDetails">
                    <h3 className="bookingDetailsText">
                        Booking Details
                    </h3>
                    <div className="bookedTimings">
                        <div className="selectedStartTime">{`${startDate} ${startTime}`}</div>
                        <div className="bookedTo">To</div>
                        <div className="selectedStartTime">{`${endDate} ${endTime}`}</div>
                    </div>
                    <div className="totalHoursBooked">
                        <AccessTimeIcon/>
                        <span>{totalHours} Hours</span>
                    </div>
                    <div className="selectedLocation">Picup Location: {`${location}`}</div>
                    <div className="changePlan" onClick = {()=>{navigate("/")}}>Change Plan</div>
                </div>
            </div>
            <div className="importantPoints">
                <h2>Important Points to Remember</h2> 
                <div className="idVerification">
                    <span>ID VERIFICATION:</span>
                    <span>Please keep your original Driving License handy.
                        While delivering the car to you, our executive will verify your original Driving License and ID proof
                        (same as the ones whose details were provided while making the booking).
                        This verification is mandatory.
                        In the unfortunate case where you cannot show these documents,
                        we will not be able to handover the car to you,
                        and it will be treated as a late cancellation (100% of the fare would be payable).
                        Driving license printed on A4 sheet of paper (original or otherwise) will not be considered as a valid document.</span>
                </div>
                <div className="preHandOverInspection">
                    <span>PRE-HANDOVER INSPECTION:</span>
                    <span>Please inspect the car (including the fuel gauge and odometer) thoroughly before approving the checklist.</span>
                </div>        
            </div>
        </div>
            <div className = "fareDetailsWrapper">
                <h2>Fare Details</h2>
                <div className = "costEstimatorWrapper">
                    <div className = "cost">
                        <span>Cost per Hour</span>
                        <span>{carDetails.costPerHour}</span>
                    </div>
                    <div className = "hoursCost">
                        <span>Cost for booked hours</span>
                        <span>{totalHours * carDetails.costPerHour}</span>
                    </div>
                    <div className = "driverDetailsEnclosure">
                    <Checkbox
                        checked={check}
                        onChange={handleChange}
                    /> Check it, if driver is required
                    </div>
                    <div className = "totalCost">
                        <span>Total Cost</span>
                        <span>{totalCost}</span>
                    </div>
                    <div className = "fuel">
                        <span>Fuel</span>
                        <span>Excluded</span>
                    </div>
                    <div className = "tollsParking">
                        <span>Tolls, Parking & inter-state Taxes</span>
                        <span>To be paid by you</span>
                    </div>
                    <StripeCheckout
                        token={onToken}
                        shippingAddress
                        amount = {totalCost * 100}
                        currency = "INR"
                        stripeKey="pk_test_51LSahvSIYNroY1eRLubvuTbArLwtZy7HT5kRlMcX58eOavkNideJU57lRVohE0UYLzilN82K2SimiSvlvyockqar00dFxuc0Ti"
                    >
                        <Button variant="contained">Book Now</Button>
                    </StripeCheckout>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        message={message}
                        key={vertical + horizontal}
                    />
                </div>
            </div>
        </div>
    );
}
