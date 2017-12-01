var mongoose = require('mongoose');
mongoose.connect('localhost:27017/kayak');
var Listings = require('../models/Listings')


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

exports.handle_request = handle_request;