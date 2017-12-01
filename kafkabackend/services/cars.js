var mongoose = require('mongoose');
mongoose.connect('54.183.101.173:27017/kayak');
var Listings = require('../models/Listings');
var Bill = require('../models/Bill');

function handle_request(msg, callback) {
    var res = {};
    var message = "";
    var city = msg.city;
    var pickuptime = msg.pickuptime;
    var dropofftime = msg.dropofftime;
    var order = msg.order;
    var filter_prop = msg.filter_prop;

    console.log("In handle request:"+ JSON.stringify(msg));
    if(order == "price_desc"){
        Listings.find(
            {
                "car.city":city,
                "car.car_type":{$nin:filter_prop.type},
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
            }).sort([['car.car_rental_price',-1]])
    }
    else{
        Listings.find(
            {
                "car.city":{'$regex':city,$options:'i'},
                "car.car_type":{$nin:filter_prop.type},
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
            }).sort([['car.car_rental_price',-1]])
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

    var cars = msg.cars;
    var userId = msg.userId;

    console.log("In handle request:"+ JSON.stringify(msg));

    var billObject = {
        user_id:userId,
        bill_date:new Date(),
        bill_type:"cars",
        cars:cars,
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