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
                    "flight.origin":{'$regex':'^'+origin+'*',$options:'i'},
                    "flight.destination":{'$regex':'^'+destination+'*',$options:'i'},
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
                "flight.origin":{'$regex':'^'+origin+'*',$options:'i'},
                "flight.destination":{'$regex':'^'+destination+'*',$options:'i'},
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
                "flight.origin":{'$regex':'^'+origin+'*',$options:'i'},
                "flight.destination":{'$regex':'^'+destination+'*',$options:'i'},
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
                "flight.origin":{'$regex':'^'+origin+'*',$options:'i'},
                "flight.destination":{'$regex':'^'+destination+'*',$options:'i'},
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

exports.handle_request = handle_request;