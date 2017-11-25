import {combineReducers} from 'redux';
import loginModal from './loginModalReducer';
import signupModal from './signupModalReducer';
import loginData from './loginReducer';
import signupData from './signupReducer';
import activeItem from './activeItemReducer';

const allReducers = combineReducers({
    loginModal,
    loginData,
    signupModal,
    signupData,
    activeItem,
    
 });
 
 export default allReducers;