var mongoose = require('mongoose');
mongoose.connect('54.183.101.173:27017/kayak');
var Listings = require('../models/Listings');
var Bill = require('../models/Bill');


function handle_request(msg, callback) {
    var res = {};
    var message = "";
    var city = msg.city;
    var checkin = msg.checkin;
    var checkout = msg.checkout;
    //var guest = msg.guest;
    var noOfRoom = msg.noOfRoom;
    var noOfGuest = msg.noOfRoom;
    var order = msg.order;
    var filter_prop = msg.filter_prop;

    console.log("In handle request:"+ JSON.stringify(msg));

    if(order == "price_desc"){
        Listings.find({
            "hotel.address.city":{'$regex':'^'+city+'+',$options:'i'},
            "hotel.rooms.room_type":"Suite",
            "hotel.stars":{$gte:parseInt(filter_prop.ratings,10)}
        }, function(err, hotels){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else
            {
                message=hotels;
                res.code = "201"
                res.data = message;
                console.log("hotels:",hotels)
                callback(null, res);

            }

        }).sort([['hotel.rooms.room_price',-1]])
    }
    else{
        Listings.find({
            "hotel.address.city":{'$regex':'^'+city+'+',$options:'i'}, 
            "hotel.rooms.room_type":"Suite",
            "hotel.stars":{$gt:parseInt(filter_prop.ratings,10)}
        }, function(err, hotels){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else
            {
                message=hotels;
                res.code = "201"
                res.data = message;
                console.log("hotels:",hotels)
                callback(null, res);

            }

        }).sort([['hotel.rooms.room_price',1]])
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

    var hotels = msg.hotels;
    var userId = msg.userId;

    console.log("In handle request:"+ JSON.stringify(msg));

    var billObject = {
        user_id:userId,
        bill_date:new Date(),
        bill_type:"hotel",
        hotels:hotels,
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