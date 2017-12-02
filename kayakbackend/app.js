var express = require('express');
var favicon = require('serve-favicon')
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
require('./routes/passport')(passport);
const fileUpload = require('express-fileupload');

var routes = require('./routes/index');
var mongoSessionURL = "mongodb://54.183.101.173:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);

var signup = require('./routes/signup');
var signupAdmin = require('./routes/signupAdmin');


var login = require('./routes/login');
var loginAdmin = require('./routes/loginAdmin');

var addHotelAdmin = require('./routes/addHotelAdmin');
var getAllHotel = require('./routes/getAllHotel');
var updateHotelAdmin = require('./routes/updateHotelAdmin');
var searchHotelAdmin = require('./routes/searchHotelAdmin');
var deleteHotelAdmin = require('./routes/deleteHotelAdmin');

var addFlightAdmin = require('./routes/addFlightAdmin');
var getAllFlight = require('./routes/getAllFlight');
var updateFlightAdmin = require('./routes/updateFlightAdmin');
var searchFlightAdmin = require('./routes/searchFlightAdmin');
var deleteFlightAdmin = require('./routes/deleteFlightAdmin');


var addCarAdmin = require('./routes/addCarAdmin');
var getAllCar = require('./routes/getAllCar');
var updateCarAdmin = require('./routes/updateCarAdmin');
var searchCarAdmin = require('./routes/searchCarAdmin');
var deleteCarAdmin = require('./routes/deleteCarAdmin');


var getAllUserDataAdmin = require('./routes/getAllUserDataAdmin');
var searchUserDataAdmin = require('./routes/searchUserDataAdmin');
var updateUserDataAdmin = require('./routes/updateUserDataAdmin');
var deleteUserDataAdmin = require('./routes/deleteUserDataAdmin');

var getAllBillAdmin = require('./routes/getAllBillAdmin');
var searchBillDateAdmin = require('./routes/searchBillDateAdmin');
var searchBillMonthAdmin = require('./routes/searchBillMonthAdmin');



var sessioncheck = require('./routes/sessioncheck');
var logout = require('./routes/logout');
var getFiles = require('./routes/getFiles');
var uploadFile = require('./routes/uploadFile');
var downloadFile = require('./routes/downloadFile');
var createFolder = require('./routes/createFolder');
var getFolders = require('./routes/getFolders');
var deleteFile = require('./routes/deleteFile');
var deleteFolder = require('./routes/deleteFolder');
var starFile = require('./routes/starFile');
var unStarFile = require('./routes/unStarFile');
var starFolder = require('./routes/starFolder');
var unStarFolder =require('./routes/unStarFolder');
var getActivity = require('./routes/getActivity');
var share = require('./routes/share');
var getSharedFiles = require('./routes/getSharedFiles');
var updateUserInfo = require('./routes/updateUserInfo');
var getUserDetails = require('./routes/getUserDetails');
var updateCardDetails = require('./routes/updateCardDetails');
var getCardDetails = require('./routes/getCardDetails');
var hotels = require('./routes/hotels');
var flights = require('./routes/flights');
var cars = require('./routes/cars');
var deleteAccount = require('./routes/deleteAccount');
var bookings = require('./routes/getBookings');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(fileUpload());

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());

app.use('/', routes);

app.use('/login', login);
app.use('/loginAdmin', loginAdmin);

app.use('/addHotelAdmin', addHotelAdmin);
app.use('/getAllHotel', getAllHotel);
app.use('/updateHotelAdmin', updateHotelAdmin);
app.use('/searchHotelAdmin', searchHotelAdmin);
app.use('/deleteHotelAdmin', deleteHotelAdmin);




app.use('/addFlightAdmin', addFlightAdmin);
app.use('/getAllFlight', getAllFlight);
app.use('/updateFlightAdmin', updateFlightAdmin);
app.use('/searchFlightAdmin', searchFlightAdmin);
app.use('/deleteFlightAdmin', deleteFlightAdmin);


app.use('/addCarAdmin', addCarAdmin);
app.use('/getAllCar', getAllCar);
app.use('/updateCarAdmin', updateCarAdmin);
app.use('/searchCarAdmin', searchCarAdmin);
app.use('/deleteCarAdmin', deleteCarAdmin);



app.use('/getAllUserDataAdmin', getAllUserDataAdmin);
app.use('/searchUserDataAdmin', searchUserDataAdmin);
app.use('/updateUserDataAdmin', updateUserDataAdmin);
app.use('/deleteUserDataAdmin', deleteUserDataAdmin);


app.use('/getAllBillAdmin', getAllBillAdmin);
app.use('/searchBillDateAdmin', searchBillDateAdmin);
app.use('/searchBillMonthAdmin', searchBillMonthAdmin);


app.use('/signup',signup);
app.use('/signupAdmin',signupAdmin);

app.use('/sessioncheck',sessioncheck);
app.use('/logout', logout);
app.use('/getFiles',getFiles);
app.use('/uploadFile',uploadFile);
app.use('/downloadFile',downloadFile);
app.use('/createFolder',createFolder);
app.use('/getFolders',getFolders);
app.use('/deleteFile',deleteFile);
app.use('/deleteFolder',deleteFolder);
app.use('/starFile',starFile);
app.use('/unStarFile',unStarFile);
app.use('/starFolder',starFolder);
app.use('/unStarFolder',unStarFolder);
app.use('/getActivity',getActivity);
app.use('/share',share);
app.use('/getSharedFiles',getSharedFiles);
app.use('/updateUserInfo',updateUserInfo);
app.use('/getUserDetails',getUserDetails);
app.use('/updateCardDetails',updateCardDetails);
app.use('/getCardDetails',getCardDetails);
app.use('/hotels', hotels);
app.use('/flights', flights);
app.use('/cars', cars);
app.use('/getbookings', bookings);
app.use('/deleteAccount', deleteAccount);

module.exports = app;