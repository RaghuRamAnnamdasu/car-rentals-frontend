import "./navbar.css";
import { Button } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useSelector, useDispatch } from "react-redux";
import { clearAnchorElement, setAnchorElement } from "../Redux/actions/menu_action";
import {  useNavigate } from "react-router-dom";
import { locationUpdation } from "../Redux/actions/location_action";


export function NavBar({type, setLoginType}){

    const navigate = useNavigate();
    var userDetails = localStorage.getItem("user");
    // console.log("before", userDetails);
    userDetails = userDetails && JSON.parse(userDetails);

    const {anchorEl} = useSelector((state)=>state.menuReducer);
    const dispatch = useDispatch();

    // const open = Boolean(anchorEl);
    const handleClick = (e) => {
        dispatch(setAnchorElement(e));
    };
    const handleClose = (e) => {
        dispatch(clearAnchorElement(e));
    };

    const signOut = () => {
        localStorage.clear();
        setLoginType(null);
        navigate("/login");
        handleClose();
    };
    
    const onAdminHomeClick = () => {
        navigate("/admin/home");
    }

    const onHomeClick = () => {
        navigate("/");
    }

    return (
        <div className = "NavBar">
            <div className = "logo">
                <img src="./pics/logo.png" alt="Logo" />
            </div>
            <div className = "NavElementsWrapper">
                {
                    type && (type === "admin" ? 
                        <div className = "homeSelector" onClick = {()=>onAdminHomeClick()}>Admin Home</div> : 
                        <div className = "homeSelector" onClick = {()=>onHomeClick()}>Home</div>)
                }
                {
                    type === "admin" ? 
                        <div className = "adminAddCar" onClick = {()=>navigate("/admin/addCar")}>Add Car</div> : 
                        null
                }
                {
                    userDetails && userDetails.userName ?
                    <div>
                        {
                            type === "admin" ? 
                                // return(
                                    <>
                                    <Button 
                                        className = "homeButton" 
                                        id = "fade-button" 
                                        variant="outlined"
                                        aria-controls={anchorEl ? 'fade-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={anchorEl ? 'true' : undefined}
                                        onClick={handleClick}>
                                            {userDetails.userName}
                                    </Button>
                                    <Menu 
                                        id="fade-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'fade-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={anchorEl}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}>
                                            <MenuItem onClick = {()=>signOut()}>Signout</MenuItem>
                                    </Menu>
                                    </>:
                                // ):
                                // return(
                                    <>
                                    <Button 
                                        className = "homeButton" 
                                        id = "fade-button" 
                                        variant="outlined"
                                        aria-controls={anchorEl ? 'fade-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={anchorEl ? 'true' : undefined}
                                        onClick={handleClick}>
                                            {userDetails.userName}
                                    </Button>
                                    <Menu 
                                        id="fade-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'fade-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={anchorEl}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}>
                                            <MenuItem onClick = {()=>{navigate("/myBookings")}}>My Bookings</MenuItem>
                                            <MenuItem onClick = {()=>signOut()}>Signout</MenuItem>
                                    </Menu>
                                    </>
                                // )
                        }
                        </div> :
                        <div className = "login-signupWrapper">
                            <Button className = "signupButton" variant="outlined" onClick = {()=>navigate("/signup")}>SignUp</Button>
                            <Button className = "loginButton" variant="outlined" onClick = {()=>navigate("/login")}>Login</Button>
                        </div>
                }
            </div>
        </div>
    );
}