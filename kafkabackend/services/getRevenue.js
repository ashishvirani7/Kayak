var mongoose = require('mongoose');
mongoose.connect('54.183.101.173:27017/kayak');
var Bill = require('../models/Bill');

function handle_hotels(msg, callback){
    var res = {};
    var message = "";
    var nextMonth = "02";
    var nextYear = msg.year;
    var thisMonth = "01";
    var arr = [];
    console.log("In handle request:" + JSON.stringify(msg));
    Bill.aggregate(
        [
            {
               // bill_date :{$month:}
                $match:{"hotel.hotel_name":msg.hotelName, "bill_type":"Hotel"}
            },
            {
                $group:{_id:{month:{$month:"$bill_date"}}, total:{$sum:"$hotel.amount"}}
            }
        ], function(err, hotels){
            if(err){
                        message="error"
                        res.code = "202"
                        res.data = message;
                        callback(null, res)
                    }
                    else{
                        res.code = "201"
                        res.data = hotels;
                        console.log(hotels);
                        callback(null, res);
                    }
        }
    )


}

function handle_flights(msg, callback){
    var res = {};
    var message = "";
    var nextMonth = "02";
    var nextYear = msg.year;
    var thisMonth = "01";
    var arr = [];
    console.log("In handle request:" + JSON.stringify(msg));
    Bill.aggregate(
        [
            {
                // bill_date :{$month:}
                $match:{"flight.flight_operator_name":msg.hotelName, "bill_type":"Flight"}
            },
            {
                $group:{_id:{month:{$month:"$bill_date"}}, total:{$sum:"$flight.amount"}}
            }
        ], function(err, hotels){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else{
                res.code = "201"
                res.data = hotels;
                console.log(hotels);
                callback(null, res);
            }
        }
    )


}

function handle_cars(msg, callback){
    var res = {};
    var message = "";
    var nextMonth = "02";
    var nextYear = msg.year;
    var thisMonth = "01";
    var arr = [];
    console.log("In handle request:" + JSON.stringify(msg));
    Bill.aggregate(
        [
            {
                // bill_date :{$month:}
                $match:{"car.car_type":msg.hotelName, "bill_type":"Car"}
            },
            {
                $group:{_id:{month:{$month:"$bill_date"}}, total:{$sum:"$car.amount"}}
            }
        ], function(err, hotels){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else{
                res.code = "201"
                res.data = hotels;
                console.log(hotels);
                callback(null, res);
            }
        }
    )


}

exports.handle_hotels = handle_hotels;
exports.handle_flights = handle_flights;
exports.handle_cars = handle_cars;