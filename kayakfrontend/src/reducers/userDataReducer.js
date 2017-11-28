import {REHYDRATE} from 'redux-persist/constants';

const initialState={
    loggedIn: false
}

export default function(state=initialState,action){
    switch(action.type){
        
        case "CHANGE_USER_DATA":
        {
            return{
                ...state,
                loggedIn: true,
                data: action.data
            };
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.userData
            if (incoming) return incoming
            return state
        }
        
        default:
            return state;
    }
}