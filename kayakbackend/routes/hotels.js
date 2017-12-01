var express = require('express');
var autoIncrement = require("mongodb-autoincrement");
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/kayak";
var kafka = require('./kafka/client');

var topic_name = "hotels_topic";

router.post('/', (req, res, next)=>{
    var city = req.body.city;
    var checkin = req.body.checkIn;
    var checkout = req.body.checkOut;
    //guest object contains #adults #children
    var guest = req.body.guest;
    var noOfGuest = req.body.noOfGuest;
    var noOfRoom = req.body.noOfRoom;
    var order = req.body.order;
    var filter_prop = req.body.filter_prop;
    var key = "search";
    kafka.make_request(topic_name, {key, city, checkin, checkout, guest, noOfGuest, noOfRoom, order, filter_prop}, function(err, results){

    console.log(filter_prop);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Hotels found:")
                return res.status(201).send(results);
            }
            else if(results.code == 202){
                console.log("No hotels found")
                return res.status(202).send(results);
            }
        }
    })
})

// router.post('/', (req,res,next)=>{
//     var email=req.body.email;
//     var password=req.body.password;
//
//
//     kafka.make_request(topic_name, {email, password}, function(err,results){
//         console.log('in result');
//         console.log(results);
//         if(err){
//             done(err,{});
//         }
//         else
//         {
//             if(results.code == 201){
//                 console.log("Signup Successful");
//                 return res.status(201).send({"message":"Signup Successful"});
//             }
//             else {
//                 res.status(202).send({"message":"User exists"});
//                 console.log("Signup Failed");
//             }
//         }
//     });
// });

router.post('/book', (req, res, next)=>{
    // var flightId = req.body.flightId;
    var userId = req.body.userId;
    // var amount = req.body.amount;
    // var departure_date = req.body.departure_date;
    // var arrival_date = req.body.arrival_date;
    // var no_of_traveler = req.body.no_of_traveler;
    var key = "book";

    /*flights:[{
        flight_id:flightId,
        flight_start_date:departure_date,
        flight_end_date:arrival_date,
        no_of_travelers:no_of_traveler,
        amount:amount,
    }]*/

    var hotels = req.body.hotels;

    kafka.make_request(topic_name, {key, userId, hotels}, function(err, results){
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Hotel booked")
                return res.status(201).send(results);
            }
            else if(results.code == 202){
                console.log("Booking error")
                return res.status(202).send(results);
            }
        }
    })
})

module.exports = router;