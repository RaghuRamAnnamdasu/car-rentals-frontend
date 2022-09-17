import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookedCars } from "../Redux/actions/myBookings_action";
import "./myBookings.css";


export function MyBookings(){

    const dispatch = useDispatch();
    const myBookingsData = useSelector((state) => state.myBookingsReducer);

    let userDetails = localStorage.getItem("user");
    userDetails = userDetails && JSON.parse(userDetails);
    const userId = userDetails.userId;

    useEffect(()=>{
        dispatch(getBookedCars(userId));
    },[])

    console.log("MyBookings",myBookingsData )
    return(
        <div className = "myBookingsWrapper">
            <h1 className = "heading">My Bookings</h1>
            <div className = "bookingDetailsContainer">
                {
                    myBookingsData.map((booking)=>{
                        return <BookingCard key = {booking._id} booking={booking} />
                    })
                }
            </div>
        </div>
    );
}

export function BookingCard({booking}){

    const startTime = `${new Date(booking.bookedTimeSlots.startTime).toDateString()} ${String(new Date(booking.bookedTimeSlots.startTime).getHours()).padStart(2, "0")}:${String(new Date(booking.bookedTimeSlots.startTime).getMinutes()).padStart(2, "0")}`
    const endTime = `${new Date(booking.bookedTimeSlots.endTime).toDateString()} ${String(new Date(booking.bookedTimeSlots.endTime).getHours()).padStart(2, "0")}:${String(new Date(booking.bookedTimeSlots.endTime).getMinutes()).padStart(2, "0")}`
    return(
        <div className="bookingCardEnclosure">
            <div className="carImageEnclosure">
                <img src = {booking.carURL} alt = {booking.carName} />
            </div>
            <div className="carDetailsEnclosure">
                <div className = "carName">{booking.carName}</div>
                <div className = "totalHours"><span>Total Hours: </span>{booking.totalHours}</div>
                <div className = "rentPerHour"><span>Rent Per Hour: </span>{booking.costPerHour}</div>
                <div className = "isDriverRequired"><span>Driver Requirement: </span>{booking.driverRequired ? "Required" : "Not Required"}</div>
                <div className = "totalFare"><span>Total Fare: </span>Rs. {booking.totalAmount}/-</div>
            </div>
            <div className="bookingDetailsEnclosure">
                <div className = "fromDate"><span>From: </span>{startTime}</div>
                <div className = "toDate"><span>To: </span>{endTime}</div>
                <div className = "location"><span>Location: </span>{booking.location}</div>
                <div className = "transactionId"><span>Transaction ID: </span>{booking.transactionId}</div>
                <div className = "dateOfBooking"><span>Date Of Booking: </span>{new Date(booking.dateOfBooking).toDateString()}</div>
            </div>
        </div>
    );
}