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
var login = require('./routes/login');
var loginAdmin = require('./routes/loginAdmin');

var addHotelAdmin = require('./routes/addHotelAdmin');
var updateHotelAdmin = require('./routes/updateHotelAdmin');

var addFlightAdmin = require('./routes/addFlightAdmin');
var updateFlightAdmin = require('./routes/updateFlightAdmin');

var addCarAdmin = require('./routes/addCarAdmin');
var updateCarAdmin = require('./routes/updateCarAdmin');

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
var hotels = require('./routes/hotels');
var flights = require('./routes/flights');
var cars = require('./routes/cars');
var deleteAccount = require('./routes/deleteAccount')

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
app.use('/updateHotelAdmin', updateHotelAdmin);


app.use('/addFlightAdmin', addFlightAdmin);
app.use('/updateFlightAdmin', updateFlightAdmin);

app.use('/addCarAdmin', addCarAdmin);
app.use('/updateCarAdmin', updateCarAdmin);

app.use('/signup',signup);
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
app.use('/hotels', hotels);
app.use('/flights', flights);
app.use('/cars', cars);
app.use('/deleteAccount', deleteAccount);

module.exports = app;