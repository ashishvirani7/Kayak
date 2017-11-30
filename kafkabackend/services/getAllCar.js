var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//mongoose.connect('localhost:27017/kayak');
mongoose.connect('54.183.101.173:27017/kayak');
var carListings = require('../models/Listings');


function handle_request(msg, callback) {

    var res = {};
    var message = "";
    console.log("In handle request:"+ JSON.stringify(msg));

    flightListings.find({"listing_type" : "Car"} , {car : 1} , function(err, carDocuments) {
        if (err) {
            console.log("Some Error Happened while getting Car Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {
            message = " Car Listing\n" + carDocuments;
            console.log(message);
            res.code = "201";
            res.data = carDocuments;
            callback(null, res);
        }
    });

}
exports.handle_request = handle_request;