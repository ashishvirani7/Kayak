var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');

var topic_name = "get_revenue_topic";

router.post('/hotels', (req, res, next)=>{
    var hotelName = req.body.hotelName;
    var year = req.body.year;
    var key = "hotels";
    kafka.make_request(topic_name, {key, hotelName, year}, function(err, results){
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Hotel Revenue found")
                return res.status(201).send(results);
            }
            else if(results.code == 202){
                console.log("Hotel Revenue not found")
                return res.status(202).send(results);
            }
        }
    })
});

router.post('/flights', (req, res, next)=>{
    var hotelName = req.body.operatorName;
    var year = req.body.year;
    var key = "flights";
    kafka.make_request(topic_name, {key, hotelName, year}, function(err, results){
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Flight Revenue found")
                return res.status(201).send(results);
            }
            else if(results.code == 202){
                console.log("Flight Revenue not found")
                return res.status(202).send(results);
            }
        }
    })
});

router.post('/cars', (req, res, next)=>{
    var hotelName = req.body.carType;
    var year = req.body.year;
    var key = "cars";
    kafka.make_request(topic_name, {key, hotelName, year}, function(err, results){
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Car Revenue found")
                return res.status(201).send(results);
            }
            else if(results.code == 202){
                console.log("Car Revenue not found")
                return res.status(202).send(results);
            }
        }
    })
});


module.exports = router;