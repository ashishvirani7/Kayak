import {combineReducers} from 'redux';
import loginModal from './loginModalReducer';
import signupModal from './signupModalReducer';
import loginData from './loginReducer';
import signupData from './signupReducer';
import activeItem from './activeItemReducer';
import adminLoginData from './adminLoginReducer';
import userData from './userDataReducer';

const allReducers = combineReducers({
    loginModal,
    loginData,
    signupModal,
    signupData,
    activeItem,
    adminLoginData,
    userData,

 });
 
 export default allReducers;