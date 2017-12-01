var mongoose = require('mongoose');
mongoose.connect('54.183.101.173:27017/kayak');
var Listings = require('../models/Listings');

var Bill = require('../models/Bill');


function handle_request(msg, callback) {
    var res = {};
    var message = "";
    var departure_date = msg.departure_date;
    var arrival_date = msg.arrival_date;
    var origin = msg.origin;
    var destination = msg.destination;
    var traveler_info= msg.traveler_info;
    var flight_class = msg.flight_class;
    var filter_prop = msg.filter_prop;
    var no_of_traveler = msg.no_of_traveler;

    console.log("In handle request:"+ JSON.stringify(msg));

    if(msg.order == "price_desc"){
            Listings.find(
                {
                    "flight.departure_date":departure_date,
                    "flight.arrival_date":arrival_date,
                    "flight.origin":{'$regex':origin,$options:'i'},
                    "flight.destination":{'$regex':destination,$options:'i'},
                    "flight.classes.class_type":flight_class,
                    "flight.stops":{$nin:filter_prop.stops},
                    "flight.flight_operator_name":{$nin:filter_prop.flight_name},

                }, function(err, flights){
                    if(err){
                        message=err
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
                }).sort([['flight.classes.class_price',-1]])
    }
    else if(msg.order == "departure_desc"){
        Listings.find(
            {
                "flight.departure_date":departure_date,
                "flight.arrival_date":arrival_date,
                "flight.origin":origin,
                "flight.destination":destination,
                "flight.classes.class_type":"Economy",
                "flight.stops":{$nin:filter_prop.stops},
                "flight.flight_operator_name":{$nin:filter_prop.flight_name},
            }, function(err, flights){
                if(err){
                    message=err
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
            }).sort([['flight.departure_date',-1]])
    }
    else if(msg.order == "duration_asc"){
        Listings.find(
            {
                "flight.departure_date":departure_date,
                "flight.arrival_date":arrival_date,
                "flight.origin":origin,
                "flight.destination":destination,
                "flight.classes.class_type":flight_class,
                "flight.stops":{$nin:filter_prop.stops},
                "flight.flight_operator_name":{$nin:filter_prop.flight_name},
            }, function(err, flights){
                if(err){
                    message=err
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
            }).sort([['flight.duration',1]])
    }
    else{
        Listings.find(
            {
                "flight.departure_date":departure_date,
                "flight.arrival_date":arrival_date,
                "flight.origin":origin,
                "flight.destination":destination,
                "flight.classes.class_type":flight_class,
                "flight.stops":{$nin:filter_prop.stops},
                "flight.flight_operator_name":{$nin:filter_prop.flight_name},
            },
            function(err, flights){
                if(err){
                    message=err
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
            }).sort([['flight.classes.class_price',1]])
    }

}

function handle_booking(msg, callback){
    var res = {};
    var message = "";
    // var departure_date = msg.departure_date;
    // var arrival_date = msg.arrival_date;
    // var no_of_traveler = msg.no_of_traveler;
    // var flightId = msg.flightId;
    // var amount = msg.amount;

    var flights = msg.flights;
    var userId = msg.userId;

    console.log("In handle request:"+ JSON.stringify(msg));

    var billObject = {
        user_id:userId,
        bill_date:new Date(),
        bill_type:"flight",
        flights:flights,
    }

    var bill = new Bill(billObject);
    bill.save(function (err, product, numAffected) {
        if (err) {
            console.log("Some Error Happened while Inserting billing details");
            res.code = "500";
            res.data = "Error Happened";
            callback(null, res);
        }
        else {
            message = numAffected + " rows added into Billing\n" + product;
            console.log(message);
            res.code = "201";
            res.data = "Bill adding Successful";
            callback(null, res);
        }
    });
}

exports.handle_booking = handle_booking;
exports.handle_request = handle_request;