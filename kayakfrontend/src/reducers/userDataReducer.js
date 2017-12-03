import {REHYDRATE} from 'redux-persist/constants';

const initialState={
    loggedIn: false,
    data:
    {first_name:"",middle_name:"",last_name:"",
        email:"a",
        address:{street:"",city:"",state:"",zip_code:""},
        phone:""
    },
    billing:
    {
        carddetails:{card_name:''}
    },
    hotels:[],
    flights:[],
    cars:[],
    hotelSearch:{},
    flightSearch:{},
    carSearch:{},
    history:[],
    booking:{}
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

        case "CHANGE_HOTEL_LISTING":
        {
            return{
                ...state,
                hotels: action.hotels
            };
        }

        case "CHANGE_HOTEL_SEARCH":
        {
            return{
                ...state,
                hotelSearch: action.hotelSearch
            };
        }

        case "CHANGE_FLIGHT_LISTING":
        {
            return{
                ...state,
                flights: action.flights
            };
        }

        case "CHANGE_FLIGHT_SEARCH":
        {
            return{
                ...state,
                flightSearch: action.flightSearch
            };
        }

        case "CHANGE_CAR_LISTING":
        {
            return{
                ...state,
                cars: action.cars
            };
        }

        case "CHANGE_CAR_SEARCH":
        {
            return{
                ...state,
                carSearch: action.carSearch
            };
        }

        case "CHANGE_BILLING_DATA":
        {
            return{
                ...state,
                billing: action.billing
            };
        }

        case "CHANGE_BOOKING":
        {
            return{
                ...state,
                booking: action.booking,
            };
        }

        case "REMOVE_BOOKING":
        {
            return{
                ...state,
                booking:{}
            }
        }

        case "CHANGE_HISTORY":
        {
            return{
                ...state,
                history: action.history,
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