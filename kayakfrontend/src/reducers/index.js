import {combineReducers} from 'redux';
import loginModal from './loginModalReducer';
import signupModal from './signupModalReducer';
import loginData from './loginReducer';
import signupData from './signupReducer';
import activeItem from './activeItemReducer';
import adminLoginData from './adminLoginReducer';
import userData from './userDataReducer';
import adminCurrentItem from './adminCurrentItem';
import adminActivePage from './adminActivePage';
import adminHotels from './adminAllHotels';
import adminFlights from './adminAllFlights';
import adminCars from './adminAllCars';
import adminUpdateCurrentData from './adminUpdateCurrentReducer';

const allReducers = combineReducers({
    loginModal,
    loginData,
    signupModal,
    signupData,
    activeItem,
    adminLoginData,
    userData,
    adminCurrentItem,
    adminActivePage,
    adminCars,
    adminFlights,
    adminHotels,
    adminUpdateCurrentData,
    
 });
 
 export default allReducers;