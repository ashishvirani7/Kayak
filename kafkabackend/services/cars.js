var mongoose = require('mongoose');
mongoose.connect('localhost:27017/kayak');
var Listings = require('../models/Listings')


function handle_request(msg, callback) {
    var res = {};
    var message = "";
    var city = msg.city;
    var pickuptime = msg.pickuptime;
    var dropofftime = msg.dropofftime;

    console.log("In handle request:"+ JSON.stringify(msg));

    Listings.find(
        {
            "car.city":city,
        }, function(err, cars){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else
            {
                message=cars;
                res.code = "201"
                res.data = message;
                callback(null, res);
            }
        })
}

exports.handle_request = handle_request;