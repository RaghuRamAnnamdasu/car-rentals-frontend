import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { carDetailsByIdReducer } from './reducers/CarDetailsById_reducer';
import { carsDataReducer } from './reducers/carsData_reducer';
import { loginReducer } from './reducers/login_reducer';
import { menuReducer } from './reducers/menu_reducer';
import { signupReducer } from './reducers/signup_reducer';
import { dateAndTimeReducer } from './reducers/DateAndTimePicker_reducer';
import { filterCarsReducer } from './reducers/filterCars_reducer';
import { rentCarReducer } from './reducers/rentCar_reducer';
import { locationReducer } from './reducers/location_reducer';
import { myBookingsReducer } from './reducers/myBookings_reducer';
import { adminAddCarReducer, adminEditCarReducer, filterAdminCarsReducer } from './reducers/adminCars_reducer';


const composeEnhancers = composeWithDevTools({
  
});

const rootReducer = combineReducers({
    
    carsDataReducer,
    signupReducer,
    loginReducer,
    menuReducer,
    carDetailsByIdReducer,
    dateAndTimeReducer,
    filterCarsReducer,
    rentCarReducer,
    locationReducer,
    myBookingsReducer,
    filterAdminCarsReducer,
    adminAddCarReducer,
    adminEditCarReducer
});


export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    
    )
);

// console.log(store.getState())

