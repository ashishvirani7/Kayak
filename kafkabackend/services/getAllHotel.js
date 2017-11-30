var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//mongoose.connect('localhost:27017/kayak');
mongoose.connect('54.183.101.173:27017/kayak');
var hotelListings = require('../models/Listings');


function handle_request(msg, callback) {

    var res = {};
    var message = "";
    console.log("In handle request:"+ JSON.stringify(msg));

    hotelListings.find({"listing_type" : "Hotel"} , {hotel : 1} , function(err, hotelDocuments) {
        if (err) {
            console.log("Some Error Happened while getting Hotel Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {
            message = " Hotel Listing\n" + hotelDocuments;
            console.log(message);
            res.code = "201";
            res.data = hotelDocuments;
            callback(null, res);
        }
    });

}
exports.handle_request = handle_request;