import './App.css';
import {Routes, Route, Redirect, BrowserRouter, Navigate, useLocation} from "react-router-dom";
import { AvailableCars } from './AvailableCars';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { RentCar } from './RentCar';
import { NavBar } from './NavBar';
import { Home } from './Home';
import { MyBookings } from './MyBookings';
import { AdminHome } from './AdminHome';
import { AdminAvailableCars } from './AdminCars';
import { useState } from 'react';
import { AdminAddCar } from './AdminAddCar';
import { AdminEditCar } from './AdminEditCar';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';


function App() {
  let userDetails = localStorage.getItem("user");
  userDetails = userDetails && JSON.parse(userDetails);
  const initialLoginType = userDetails && userDetails.type;
  const[type, setLoginType] = useState(initialLoginType);
  const location = useLocation();
  const isResetPasswordPage = location.pathname.includes("reset-password") ? true : false;
  console.log("location", location);


  return (
    <div className="App">
      
      {/* <BrowserRouter> */}
      {!isResetPasswordPage ? <NavBar type = {type} setLoginType = {setLoginType} /> : null}
        <Routes>
          <Route path = "/login" element = {<Login setLoginType={setLoginType}/>} />
          <Route path = "/signup" element = {<SignUp/>} />
          <Route path="/forgotpassword" element={<ForgotPassword />}/>
          <Route path="/reset-password/:id/:token" element={<ResetPassword />}/>
          <Route path = "/" element={type === "user" ? <Home/> : <NavigateComponent/>} />
          <Route path = "/availableCars" element = {type === "user" ? <AvailableCars/> : <NavigateComponent/>}/>
          <Route path = "/rentCar/:id" element = {type === "user" ? <RentCar/> : <NavigateComponent/>} />
          <Route path = "/myBookings" element = {type === "user" ? <MyBookings/> : <NavigateComponent/>} />
          <Route path = "/admin/home" element = {type === "admin" ? <AdminHome/> : <NavigateComponent/>} />
          <Route path = "/admin/cars/:location" element = {type === "admin" ? <AdminAvailableCars/> : <NavigateComponent/>} />
          <Route path = "/admin/addCar" element = {type === "admin" ? <AdminAddCar/> : <NavigateComponent/>} />
          <Route path = "/admin/editCar/:carId" element = {type === "admin" ? <AdminEditCar/> : <NavigateComponent/>} />
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}


export default App;

export function NavigateComponent() {
  localStorage.clear();   
  return (
    <Navigate to="/login" />
  );
}


