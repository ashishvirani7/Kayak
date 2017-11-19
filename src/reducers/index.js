import {combineReducers} from 'redux';
import loginModal from './loginModalReducer';
import signupModal from './signupModalReducer';
import loginData from './loginReducer';
import signupData from './signupReducer';

const allReducers = combineReducers({
    loginModal,
    loginData,
    signupModal,
    signupData,

 });
 
 export default allReducers;