import {combineReducers} from 'redux';
import loginModal from './loginModalReducer';
import signupModal from './signupModalReducer';
import loginData from './loginReducer';
import signupData from './signupReducer';
import activeItem from './activeItemReducer';
import adminLoginData from './adminLoginReducer';
import adminCurrentItem from './adminCurrentItem';
import adminActivePage from './adminActivePage';

const allReducers = combineReducers({
    loginModal,
    loginData,
    signupModal,
    signupData,
    activeItem,
    adminLoginData,
    adminCurrentItem,
    adminActivePage,
    
 });
 
 export default allReducers;