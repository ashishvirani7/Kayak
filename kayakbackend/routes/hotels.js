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

    kafka.make_request(topic_name, {city, checkin, checkout, guest}, function(err, results){
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


module.exports = router;