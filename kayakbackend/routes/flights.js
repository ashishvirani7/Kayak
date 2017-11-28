var express = require('express');
var autoIncrement = require("mongodb-autoincrement");
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/kayak";
var kafka = require('./kafka/client');

var topic_name = "flights_topic";

router.post('/', (req, res, next)=>{
    var origin = req.body.origin;
    var destination = req.body.destination;
    var departure_date = req.body.departure_date;
    //arrival date should be empty if it is one-way flight
    var arrival_date = req.body.arrival_date;
    //traveler_info may contain number of adult/children and class(business or economy)
    var traveler_info = req.body.traveler_info;


    kafka.make_request(topic_name, {origin, destination, departure_date, arrival_date, traveler_info}, function(err, results){
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Flights found")
                return res.status(201).send(results);
            }
            else if(results.code == 202){
                console.log("No flights found")
                return res.status(202).send(results);
            }
        }
    })
})

module.exports = router;