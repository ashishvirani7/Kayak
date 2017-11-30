var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//mongoose.connect('localhost:27017/kayak');
mongoose.connect('54.183.101.173:27017/kayak');
var flightListings = require('../models/Listings');


function handle_request(msg, callback) {

    var res = {};
    var message = "";
    console.log("In handle request:"+ JSON.stringify(msg));

    flightListings.find({"listing_type" : "Flight"} , {flight : 1} , function(err, flightDocuments) {
        if (err) {
            console.log("Some Error Happened while getting Flight Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {
            message = " Flight Listing\n" + flightDocuments;
            console.log(message);
            res.code = "201";
            res.data = flightDocuments;
            callback(null, res);
        }
    });

}
exports.handle_request = handle_request;