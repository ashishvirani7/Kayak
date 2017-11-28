var express = require('express');
var autoIncrement = require("mongodb-autoincrement");
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/kayak";
var kafka = require('./kafka/client');

var topic_name = "cars_topic";

router.post('/', (req, res, next)=>{
    var city = req.body.city;
var pickuptime = req.body.pickuptime;
var dropofftime = req.body.dropofftime;
var order = req.body.order;
var filter_prop = req.body.filter_prop;

kafka.make_request(topic_name, {city, pickuptime, dropofftime, order, filter_prop}, function(err, results){
    if(err){
        done(err,{});
    }
    else
    {
        if(results.code == 201){
            console.log("Cars found")
            return res.status(201).send(results);
        }
        else if(results.code == 202){
            console.log("No cars found")
            return res.status(202).send(results);
        }
    }
})
})

module.exports = router;