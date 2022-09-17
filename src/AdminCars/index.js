import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../Redux/actions/getAllCars_action";
import { Button, IconButton } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./adminCars.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { adminDeletedCar, deleteCar } from "../Redux/actions/adminCars_action";



export function AdminAvailableCars(){

   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { adminAvailableCarsList,error } = useSelector((state) => state.filterAdminCarsReducer);
    useEffect(()=>{
        if(!adminAvailableCarsList.length) {
            navigate("/admin/home");
        }
    },[adminAvailableCarsList])

    return(
        <div className = "homePage">
            {adminAvailableCarsList.map((value,index)=>{
                return(<CarCard carData={value} key={index} adminAvailableCarsList = {adminAvailableCarsList} />);
            })}
        </div>
    );
}

function CarCard({carData, adminAvailableCarsList}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log("carcard",carData);
    const handleEdit = ()=>{
        navigate(`/admin/editCar/${carData._id}`);
    }

    const handleDelete = ()=>{
        dispatch(deleteCar(carData._id, adminAvailableCarsList));
        console.log("carData._id", carData._id)
    }

    return(
        <Card className = "cardWrapper">
            <img className = "carImage" src = {carData.image} alt ={carData.name} />
            <CardContent className = "contentWrapper">
                <div className = "content">
                    <h3 className = "carName">{carData.name}</h3>
                    <div className = "carRent">Rent Per Hour : INR {carData.costPerHour}</div>
                </div>
                <IconButton>
                    <EditIcon color="primary" fontSize="medium" onClick = {handleEdit}/>
                </IconButton>
                <IconButton>
                    <DeleteIcon color="primary" fontSize="medium" onClick = {handleDelete}/>
                </IconButton>
            </CardContent>
        </Card>
    );
}