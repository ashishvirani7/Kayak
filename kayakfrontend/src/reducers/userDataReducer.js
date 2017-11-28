import {REHYDRATE} from 'redux-persist/constants';

const initialState={
}

export default function(state=initialState,action){
    switch(action.type){
        
        case "CHANGE_USER_DATA":
        {
            return{
                ...state,
                data: action.data
            };
        }

        case "persist/REHYDRATE":
        {
            var incoming = action.payload.loginData
            if (incoming) return incoming
            return state
        }
        
        default:
            return state;
    }
}