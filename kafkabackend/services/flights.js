var mongoose = require('mongoose');
mongoose.connect('localhost:27017/kayak');
var Listings = require('../models/Listings')


function handle_request(msg, callback) {
    var res = {};
    var message = "";
    var departure_date = msg.departure_date;
    var arrival_date = msg.arrival_date;
    var origin = msg.origin;
    var destination = msg.destination;
    var  traveler_info= msg.traveler_info;

    console.log("In handle request:"+ JSON.stringify(msg));

    Listings.find(
        {
            "flight.departure_date":departure_date,
            "flight.arrival_date":arrival_date,
            "flight.origin":origin,
            "flight.destination":destination,
        }, function(err, flights){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else
            {
                message=flights;
                res.code = "201"
                res.data = message;
                callback(null, res);
            }
        })
}

exports.handle_request = handle_request;